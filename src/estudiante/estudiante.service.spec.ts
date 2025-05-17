import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { ActividadEntity } from '../actividad/actividad.entity/actividad.entity';
import { InscripcionEntity } from '../inscripcion/inscripcion.entity/inscripcion.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('EstudianteService', () => {
  let service: EstudianteService;

  const estudianteRepoMock = {
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const actividadRepoMock = {
    findOne: jest.fn(),
  };

  const inscripcionRepoMock = {
    count: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        { provide: getRepositoryToken(EstudianteEntity), useValue: estudianteRepoMock },
        { provide: getRepositoryToken(ActividadEntity), useValue: actividadRepoMock },
        { provide: getRepositoryToken(InscripcionEntity), useValue: inscripcionRepoMock },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
  });

  afterEach(() => jest.clearAllMocks());

  it('debería crear un estudiante válido (positivo)', async () => {
    const input = {
      cedula: 123,
      nombre: 'Juan Pérez',
      correo: 'juan@example.com',
      programa: 'Ingeniería',
      semestre: 5,
    };
    estudianteRepoMock.save.mockResolvedValue({ id: 1, ...input });
    const result = await service.crearEstudiante(input);
    expect(result).toHaveProperty('id');
    expect(result.nombre).toBe('Juan Pérez');
  });

  it('debería fallar con email inválido', async () => {
    const input = { cedula: 1, nombre: 'A', correo: 'mal', programa: 'X', semestre: 5 };
    await expect(service.crearEstudiante(input)).rejects.toThrow(BadRequestException);
  });

  it('debería fallar con semestre fuera de rango', async () => {
    const input = { cedula: 1, nombre: 'A', correo: 'a@a.com', programa: 'X', semestre: 11 };
    await expect(service.crearEstudiante(input)).rejects.toThrow(BadRequestException);
  });

  it('debería encontrar estudiante por ID (positivo)', async () => {
    estudianteRepoMock.findOne.mockResolvedValue({ id: 1, nombre: 'Test' });
    const result = await service.findEstudianteById(1);
    expect(result.nombre).toBe('Test');
  });

  it('debería lanzar error si no encuentra estudiante (negativo)', async () => {
    estudianteRepoMock.findOne.mockResolvedValue(null);
    await expect(service.findEstudianteById(99)).rejects.toThrow(NotFoundException);
  });

  it('debería inscribir correctamente a actividad (positivo)', async () => {
    const estudiante = { id: 1 };
    const actividad = { id: 2, cupoMaximo: 10, estado: 0 };
    const saved = {
      estudiante: { id: 1 },
      actividad: { id: 2 },
      fechaInscripcion: '2024-05-17',
    };

    estudianteRepoMock.findOne.mockResolvedValue(estudiante);
    actividadRepoMock.findOne.mockResolvedValue(actividad);
    inscripcionRepoMock.count.mockResolvedValue(0);
    inscripcionRepoMock.findOne.mockResolvedValue(null);
    inscripcionRepoMock.create.mockReturnValue(saved);
    inscripcionRepoMock.save.mockResolvedValue(saved);

    const result = await service.inscribirseActividad(1, 2);
    expect(result.estudianteId).toBe(1);
    expect(result.actividadId).toBe(2);
  });

  it('debería fallar si la actividad no existe', async () => {
    estudianteRepoMock.findOne.mockResolvedValue({ id: 1 });
    actividadRepoMock.findOne.mockResolvedValue(null);
    await expect(service.inscribirseActividad(1, 999)).rejects.toThrow(NotFoundException);
  });

  it('debería fallar si no hay cupo', async () => {
    estudianteRepoMock.findOne.mockResolvedValue({ id: 1 });
    actividadRepoMock.findOne.mockResolvedValue({ id: 2, cupoMaximo: 1, estado: 0 });
    inscripcionRepoMock.count.mockResolvedValue(1);
    await expect(service.inscribirseActividad(1, 2)).rejects.toThrow(BadRequestException);
  });

  it('debería fallar si la actividad no está abierta', async () => {
    estudianteRepoMock.findOne.mockResolvedValue({ id: 1 });
    actividadRepoMock.findOne.mockResolvedValue({ id: 2, cupoMaximo: 5, estado: 1 });
    inscripcionRepoMock.count.mockResolvedValue(0);
    await expect(service.inscribirseActividad(1, 2)).rejects.toThrow(BadRequestException);
  });

  it('debería fallar si ya está inscrito', async () => {
    estudianteRepoMock.findOne.mockResolvedValue({ id: 1 });
    actividadRepoMock.findOne.mockResolvedValue({ id: 2, cupoMaximo: 10, estado: 0 });
    inscripcionRepoMock.count.mockResolvedValue(0);
    inscripcionRepoMock.findOne.mockResolvedValue({});
    await expect(service.inscribirseActividad(1, 2)).rejects.toThrow(BadRequestException);
  });
});