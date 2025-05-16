Perfecto. El **Punto 4** del parcial solicita una **documentación de los endpoints** en el siguiente formato:

```
<metodo> <URI> - <EntradaDTO> - <SalidaDTO>
```

A continuación, te presento la definición completa de los **endpoints esperados**, junto con una descripción corta de cada **DTO** (esto debes escribir en la parte de atrás de la hoja, como indica el enunciado).

---

### 📄 **Documentación de Endpoints**

#### 🧑‍🎓 Estudiante

```
POST    /estudiante                  - CrearEstudianteDTO        - EstudianteDTO
GET     /estudiante/:id             - SinDTO                     - EstudianteDTO
POST    /estudiante/:id/inscribir   - InscribirActividadDTO      - InscripcionDTO
```

#### 🎭 Actividad

```
POST    /actividad                  - CrearActividadDTO          - ActividadDTO
PUT     /actividad/:id/estado       - CambiarEstadoDTO           - ActividadDTO
GET     /actividad/fecha/:fecha     - SinDTO                     - ActividadesDTO[]
```

#### 📝 Reseña

```
POST    /resena                     - CrearResenaDTO             - ResenaDTO
GET     /resena/:id                 - SinDTO                     - ResenaDTO
```

---

### 🧾 **Definición de DTOs (parte trasera de la hoja)**

#### CrearEstudianteDTO

```ts
{
  cedula: number;
  nombre: string;
  correo: string;
  programa: string;
  semestre: number;
}
```

#### EstudianteDTO

```ts
{
  id: Long;
  cedula: number;
  nombre: string;
  correo: string;
  programa: string;
  semestre: number;
}
```

#### InscribirActividadDTO

```ts
{
  actividadId: Long;
  estudianteId: Long
}
```

#### InscripcionDTO

```ts
{
  estudianteId: Long;
  actividadId: Long;
  fechaInscripcion: string;
}
```

#### CrearActividadDTO

```ts
{
  titulo: string;
  fecha: string;
  cupoMaximo: number;
}
```

#### ActividadDTO

```ts
{
  id: Lomg;
  titulo: string;
  fecha: string;
  cupoMaximo: number;
  estado: number;
}
```

#### CambiarEstadoDTO

```ts
{
  estado: number; // 0 = abierta, 1 = cerrada, 2 = finalizada
  actividadID: Long
}
```

#### ActividadesDTO\[]

```ts
ActividadDTO[];
```

#### CrearResenaDTO

```ts
{
  comentario: string;
  calificacion: number;
  fecha: string;
  estudianteId: Long;
  actividadId: Long;
}
```

#### ResenaDTO

```ts
{
  id: Long;
  comentario: string;
  calificacion: number;
  fecha: string;
  estudianteId: Long;
  actividadId: Long;
}
```

---

¿Quieres que prepare también los DTOs en archivos `.ts` listos para tu proyecto NestJS?
+