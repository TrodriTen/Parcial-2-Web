import { Test, TestingModule } from '@nestjs/testing';
import { ActividadService } from './actividad.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ActividadEntity } from './actividad.entity/actividad.entity';
import { InscripcionEntity } from '../inscripcion/inscripcion.entity/inscripcion.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ActividadService', () => {
  let service: ActividadService;

  const actividadRepoMock = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const inscripcionRepoMock = {
    count: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActividadService,
        { provide: getRepositoryToken(ActividadEntity), useValue: actividadRepoMock },
        { provide: getRepositoryToken(InscripcionEntity), useValue: inscripcionRepoMock },
      ],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
  });

  afterEach(() => jest.clearAllMocks());

  it('debería crear una actividad válida (positivo)', async () => {
    const input = {
      titulo: 'Actividad prueba valida 123',
      fecha: '2024-05-01',
      cupoMaximo: 20,
    };

    actividadRepoMock.save.mockResolvedValue({ id: 1, ...input, estado: 0 });

    const result = await service.crearActividad(input);
    expect(result.estado).toBe(0);
    expect(result.titulo).toBe(input.titulo);
  });

  it('debería fallar si el título es inválido (negativo)', async () => {
    const input = {
      titulo: 'Corto@',
      fecha: '2024-05-01',
      cupoMaximo: 20,
    };
    await expect(service.crearActividad(input)).rejects.toThrow(BadRequestException);
  });

  it('debería retornar actividades por fecha (positivo)', async () => {
    const fecha = '2024-05-10';
    const actividades = [{ id: 1, titulo: 'Actividad de prueba', fecha, cupoMaximo: 20, estado: 0 }];
    actividadRepoMock.find.mockResolvedValue(actividades);

    const result = await service.findAllActividadesByDate(fecha);
    expect(result).toEqual(actividades);
    expect(actividadRepoMock.find).toHaveBeenCalledWith({ where: { fecha } });
  });

  it('debería cambiar estado a cerrada si tiene al menos 80% inscritos (positivo)', async () => {
    const actividad = { id: 1, cupoMaximo: 10, estado: 0 };
    actividadRepoMock.findOne.mockResolvedValue(actividad);
    inscripcionRepoMock.count.mockResolvedValue(8);
    actividadRepoMock.save.mockResolvedValue({ ...actividad, estado: 1 });

    const result = await service.cambiarEstado(1, 1);
    expect(result.estado).toBe(1);
  });

  it('debería fallar al cerrar si no tiene 80% de inscritos (negativo)', async () => {
    actividadRepoMock.findOne.mockResolvedValue({ id: 1, cupoMaximo: 10, estado: 0 });
    inscripcionRepoMock.count.mockResolvedValue(5);
    await expect(service.cambiarEstado(1, 1)).rejects.toThrow(BadRequestException);
  });

  it('debería cambiar estado a finalizada si no hay cupo (positivo)', async () => {
    const actividad = { id: 1, cupoMaximo: 5, estado: 0 };
    actividadRepoMock.findOne.mockResolvedValue(actividad);
    inscripcionRepoMock.count.mockResolvedValue(5);
    actividadRepoMock.save.mockResolvedValue({ ...actividad, estado: 2 });

    const result = await service.cambiarEstado(1, 2);
    expect(result.estado).toBe(2);
  });

  it('debería fallar al finalizar si aún hay cupos (negativo)', async () => {
    actividadRepoMock.findOne.mockResolvedValue({ id: 1, cupoMaximo: 10, estado: 0 });
    inscripcionRepoMock.count.mockResolvedValue(6);
    await expect(service.cambiarEstado(1, 2)).rejects.toThrow(BadRequestException);
  });

  it('debería lanzar error si la actividad no existe (negativo)', async () => {
    actividadRepoMock.findOne.mockResolvedValue(null);
    await expect(service.cambiarEstado(1, 1)).rejects.toThrow(NotFoundException);
  });
});
