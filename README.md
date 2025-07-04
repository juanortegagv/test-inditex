# PRUEBA INDITEX

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico Principal

- **Framework**: Next.js 15 con App Router
- **Frontend**: React 18 con TypeScript
- **Estilos**: CSS Modules para componentes principales + Tailwind CSS para UI
- **Estado**: React Context API para gestión de estado global
- **UI Components**: Radix UI
- **Testing**: Jest + React Testing Library

### Estructura de Carpetas

```
src/
├── app/                    # Páginas de Next.js (App Router)
│   ├── cart/              # Página del carrito
│   ├── product/[id]/      # Página de detalle de producto
│   └── page.tsx           # Página principal
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes de UI
│   ├── cart.tsx          # Componente del carrito
│   ├── header.tsx        # Componente del header
│   └── product-card.tsx  # Tarjeta de producto
├── context/              # Contextos de React para estado global
│   ├── cart-context.tsx  # Gestión del carrito
│   └── product-context.tsx # Gestión de productos
├── hooks/                # Hooks personalizados
├── lib/                  # Utilidades y configuraciones
│   ├── api.ts           # Funciones de API
│   ├── types.ts         # Tipos de TypeScript
│   └── utils.ts         # Utilidades generales
```

## 🎨 Estrategia de Estilos

### CSS Modules para Componentes Principales

Los componentes principales utilizan **CSS Modules** para mantener un control granular sobre los estilos y evitar conflictos de nombres:

- `src/app/home.module.css` - Estilos de la página principal
- `src/app/cart/cart.module.css` - Estilos del carrito
- `src/app/product/[id]/product.module.css` - Estilos de detalle de producto
- `src/components/product-card.module.css` - Estilos de las tarjetas de producto

### Tailwind CSS para Componentes UI

Los componentes de interfaz de usuario utilizan **Tailwind CSS** por comodidad y rapidez de desarrollo:

- Utilidades de Tailwind para espaciado, colores y responsive design

Esta estrategia híbrida nos permite:

- Mantener control total sobre los estilos de componentes específicos
- Acelerar el desarrollo de componentes UI reutilizables
- Evitar conflictos de CSS entre diferentes partes de la aplicación

## 🔧 Gestión de Estado

### Context API

La aplicación utiliza React Context API para gestionar el estado global:

#### ProductContext

- **Propósito**: Gestionar la lista de productos y búsqueda
- **Funcionalidades**:
  - Carga de productos desde la API
  - Filtrado por búsqueda en tiempo real
  - Manejo de estados de carga y error
  - Eliminación de productos duplicados

#### CartContext

- **Propósito**: Gestionar el carrito de compras
- **Funcionalidades**:
  - Agregar/eliminar productos del carrito
  - Persistencia en localStorage
  - Cálculo de totales y cantidades
  - Notificaciones toast al agregar productos

## 🌐 Integración con API

### Configuración

La aplicación se conecta a una API externa mediante variables de entorno:

- `NEXT_PUBLIC_API_KEY`: Clave de autenticación
- `NEXT_PUBLIC_BASE_URL`: URL base de la API

### Funciones Principales

- `getProducts()`: Obtiene lista de productos con filtrado opcional
- `getProductById()`: Obtiene detalles de un producto específico

### Manejo de Errores

- Validación de respuestas de API
- Manejo de errores 404 y otros códigos de estado
- Mensajes de error descriptivos para el usuario

## 🚀 Cómo Usar el Proyecto

### Requisitos Previos

- Node.js 18+
- npm o yarn

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/juanortegagv/inditex-test.git
   cd inditest
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo `.env.local` en la raíz del proyecto:
   ```env
   NEXT_PUBLIC_BASE_URL="https://prueba-tecnica-api-tienda-moviles.onrender.com"
   NEXT_PUBLIC_API_KEY="87909682e6cd74208f41a6ef39fe4191"
   ```

### Comandos Disponibles

#### Desarrollo

```bash
npm run dev
```

- Inicia el servidor de desarrollo con Turbopack
- Accesible en `http://localhost:3000`

#### Producción

```bash
npm run build
npm run start
```

- `build`: Crea la versión optimizada para producción
- `start`: Ejecuta el servidor de producción

#### Testing

```bash
npm run test
```

- Ejecuta las pruebas con Jest en modo watch
- Incluye pruebas para componentes principales

#### Otros Comandos

```bash
npm run lint
```

## 📱 Funcionalidades Principales

### Página Principal

- **Búsqueda en tiempo real**: Filtra productos por nombre o marca
- **Grid responsivo**: Muestra productos en una cuadrícula adaptativa
- **Estados de carga**: Skeleton loaders mientras se cargan los datos
- **Manejo de errores**: Mensajes informativos para el usuario

### Detalle de Producto

- **Información completa**: Especificaciones, descripción, rating
- **Opciones de color**: Selección visual de colores disponibles
- **Opciones de almacenamiento**: Diferentes capacidades con precios
- **Productos similares**: Recomendaciones relacionadas

### Carrito de Compras

- **Persistencia local**: Los productos se mantienen entre sesiones
- **Gestión de cantidades**: Agregar/eliminar productos
- **Cálculo automático**: Total y cantidad de items
- **Notificaciones**: Toast notifications al agregar productos

## 🧪 Testing

El proyecto incluye una suite de pruebas completa:

### Archivos de Prueba

- `__tests__/cart.test.tsx` - Pruebas del carrito
- `__tests__/home.test.tsx` - Pruebas de la página principal
- `__tests__/product-detail.test.tsx` - Pruebas de detalle de producto

### Configuración

- **Jest** como framework de testing
- **React Testing Library** para testing de componentes
- **jsdom** como entorno de testing
- Configuración en `jest.config.js` y `jest.setup.js`

## 🔧 Configuración Técnica

### Next.js

- **App Router**: Utiliza el nuevo sistema de rutas de Next.js 15
- **Turbopack**: Compilación rápida en desarrollo
- **Image Optimization**: Configuración para múltiples dominios de imágenes
- **TypeScript**: Configuración estricta con verificación de tipos

**Desarrollado con ❤️ usando Next.js, React y TypeScript**
