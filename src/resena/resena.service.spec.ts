// =============================
// resena.service.spec.ts
// =============================
import { Test, TestingModule } from '@nestjs/testing';
import { ResenaService } from './resena.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResenaEntity } from './resena.entity/resena.entity';
import { ActividadEntity } from '../actividad/actividad.entity/actividad.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity/estudiante.entity';
import { InscripcionEntity } from '../inscripcion/inscripcion.entity/inscripcion.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ResenaService', () => {
  let service: ResenaService;

  const resenaRepoMock = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const actividadRepoMock = {
    findOne: jest.fn(),
  };

  const estudianteRepoMock = {
    findOne: jest.fn(),
  };

  const inscripcionRepoMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResenaService,
        { provide: getRepositoryToken(ResenaEntity), useValue: resenaRepoMock },
        { provide: getRepositoryToken(ActividadEntity), useValue: actividadRepoMock },
        { provide: getRepositoryToken(EstudianteEntity), useValue: estudianteRepoMock },
        { provide: getRepositoryToken(InscripcionEntity), useValue: inscripcionRepoMock },
      ],
    }).compile();

    service = module.get<ResenaService>(ResenaService);
  });

  afterEach(() => jest.clearAllMocks());

  it('debería agregar reseña válida (positivo)', async () => {
    const data = {
      comentario: 'Excelente actividad',
      calificacion: 5,
      fecha: '2024-05-01',
      estudianteId: 1,
      actividadId: 2,
    };

    const estudiante = { id: 1 };
    const actividad = { id: 2, estado: 2 };
    const saved = { id: 10, ...data, estudiante, actividad };

    actividadRepoMock.findOne.mockResolvedValue(actividad);
    estudianteRepoMock.findOne.mockResolvedValue(estudiante);
    inscripcionRepoMock.findOne.mockResolvedValue({});
    resenaRepoMock.create.mockReturnValue(saved);
    resenaRepoMock.save.mockResolvedValue(saved);

    const result = await service.agregarResena(data);
    expect(result.id).toBe(10);
    expect(result.estudianteId).toBe(1);
    expect(result.actividadId).toBe(2);
  });

  it('debería fallar si la actividad no está finalizada (negativo)', async () => {
    actividadRepoMock.findOne.mockResolvedValue({ id: 1, estado: 0 });
    await expect(
      service.agregarResena({ comentario: '', calificacion: 3, fecha: '', estudianteId: 1, actividadId: 1 })
    ).rejects.toThrow(BadRequestException);
  });

  it('debería fallar si el estudiante no existe (negativo)', async () => {
    actividadRepoMock.findOne.mockResolvedValue({ id: 1, estado: 2 });
    estudianteRepoMock.findOne.mockResolvedValue(null);
    await expect(
      service.agregarResena({ comentario: '', calificacion: 3, fecha: '', estudianteId: 99, actividadId: 1 })
    ).rejects.toThrow(NotFoundException);
  });

  it('debería fallar si el estudiante no estuvo inscrito (negativo)', async () => {
    actividadRepoMock.findOne.mockResolvedValue({ id: 1, estado: 2 });
    estudianteRepoMock.findOne.mockResolvedValue({ id: 1 });
    inscripcionRepoMock.findOne.mockResolvedValue(null);
    await expect(
      service.agregarResena({ comentario: '', calificacion: 3, fecha: '', estudianteId: 1, actividadId: 1 })
    ).rejects.toThrow(BadRequestException);
  });
});