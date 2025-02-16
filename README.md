# Users Form App

## Descripción
Aplicación React para gestión de usuarios con formulario y lista.

## Estructura del Proyecto

### Context
- `UserListContext.tsx`: Almacena y gestiona el estado global de la lista de usuarios

### Services
- `apiJSONPlaceholder.ts`: Maneja las peticiones POST para crear usuarios
- `apiLocalidades.ts`: Obtiene datos de localidades
- `apiMunicipios.ts`: Obtiene datos de municipios

## Características
- Formulario de registro de usuarios
- Lista de usuarios con transiciones
- Selección de localidades y municipios
- Estado global con Context API
- Tipado con TypeScript

## Tecnologías
- React
- TypeScript
- Tailwind CSS
- Context API

## Instalación
```bash
npm install
npm run dev
```

## Uso
1. Completa el formulario con los datos del usuario
2. Selecciona localidad y municipio
3. Envía el formulario
4. Observa la lista actualizada con el nuevo usuario