![image](https://github.com/user-attachments/assets/cdfe43bc-2c39-4eb1-9625-c2c49c6ee58c)
# 🏥 Sala Médica UTN

Aplicación web de gestión de turnos médicos, desarrollada como trabajo práctico para la Universidad Tecnológica Nacional (UTN). Permite a pacientes, especialistas y administradores interactuar en un entorno seguro para la administración de turnos, historiales clínicos, calificaciones y más.

---

## ⚙️ Tecnologías utilizadas

- **Angular** (standalone + Material UI)
- **Firebase** (Authentication, Firestore, Storage)
- **SCSS** (estilado personalizado)
- **Angular Animations**
- **Chart.js** (gráficos para estadísticas)

---

## 🚀 Funcionalidades principales

- Registro y login por rol: paciente, especialista, administrador.
- Flujo de solicitud de turnos: especialidad → profesional → fecha → horario.
- Administración de turnos según el rol.
- Carga de reseña médica e historial clínico por el especialista.
- Calificación de atención por parte del paciente.
- Panel administrativo con estadísticas y gestión de usuarios.
- Filtros avanzados y búsqueda por campos dinámicos.
- Animaciones de transición entre vistas.

---

## 📸 Capturas de pantalla

| Título | Imagen |
|--------|--------|
| Bienvenida | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/home/bienvenida.png) |
| Inicio de sesión | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/home/iniciar-sesion.png) |
| Registro | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/home/registro-categoria.png)|
| Registro de paciente | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/home/registro-paciente.png) |
| Selección de especialidad | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/home/registro-especialista.png) |
| Perfil paciente | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/paciente/paciente-perfil.png) |
| Mis turnos (Paciente) | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/paciente/turnos-paciente.png) |
| Mis turnos realizados | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/paciente/turnos-realizado-paciente.png) |
| Solicitud turno paciente | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/paciente/solicitud-turno-paciente.png) |
| Historial clinica | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/paciente/historial-clinica-paciente.png) |
| PDF historial clinica | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/paciente/pdf-historial-clinico.png) |
| Especialista perfil | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/especialista/especialista-perfil.png) |
| Mis turnos especialista rechazados / cancelados | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/especialista/mis-turnos-especialista-cancelado-rechazado.png) |
| Especialista rechazar turno | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/especialista/especialista-recharzar-turno.png) |
| Mis turnos especialista realizados | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/especialista/mis-turnos-especialista-realizado.png) |
| Panel especialista | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/especialista/panel-especialista.png) |
| Reseña al paciente | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/especialista/rese%C3%B1a-paciente.png) |
| Mis pacientes especialista | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/especialista/especialista-pacientes.png) |
| Admin perfil | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/admin/admin-perfil.png) |
| Admin lista turnos | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/admin/admin-lista-turnos.png) |
| Admin lista Usuarios | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/admin/admin-lista-usuario.png) |
| Admin registro usuario | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/admin/admin-registro-usuario.png) |
| Admin registro admin | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/admin/admin-registro-admin.png) |
| Admin sacar turno | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/admin/admin-sacar-turno.png) |
| Admin tabla especialista | ![](https://raw.githubusercontent.com/IvanBecerra1/Sala-Medica-UTN/refs/heads/main/salaMedifcaFotos/admin/admin-tabla-especialista.png) |

---

## 📁 Instalación local

```bash
# 1. Clonar el repositorio
git clone https://github.com/IvanBecerra1/Sala-Medica-UTN.git
cd Sala-Medica-UTN

# 2. Instalar dependencias
npm install

# 3. Configurar Firebase
# Crear archivo src/environments/environment.ts con tu config Firebase

# 4. Ejecutar en entorno local
ng serve
# Abrir en http://localhost:4200
```

## 📁 Estructura del proyecto
```bash
src/
├── app/
│   ├── auth/           # Login y registro por rol
│   ├── paciente/       # Vista del paciente
│   ├── especialista/   # Vista del especialista
│   ├── admin/          # Panel administrativo
│   ├── shared/         # Componentes reutilizables
│   └── core/           # Servicios, modelos y utilidades
```

