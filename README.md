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
│   ├── cart-item.tsx     # Item individual del carrito
│   ├── cart-summary.tsx  # Resumen del carrito
│   ├── header.tsx        # Componente del header
│   ├── home-client.tsx   # Componente de la página principal
│   ├── home-client.module.css # Estilos de la página principal
│   ├── product-card.tsx  # Tarjeta de producto
│   ├── product-card.module.css # Estilos de tarjetas
│   ├── product-detail-client.tsx # Cliente del detalle de producto
│   ├── product-extra-info.tsx # Información adicional del producto
│   ├── product-main-info.tsx # Información principal del producto
│   └── product-skeleton.tsx # Skeleton del detalle de producto
├── context/              # Contextos de React para estado global
│   └── cart-context.tsx  # Gestión del carrito
├── hooks/                # Hooks personalizados
│   ├── use-toast.ts      # Hook para notificaciones toast
│   ├── use-viewport-items.ts # Hook para calcular items visibles en viewport
│   ├── use-cart-viewport-items.ts # Hook específico para viewport del carrito
│   └── consts.ts         # Constantes del proyecto
├── lib/                  # Utilidades y configuraciones
│   ├── api.ts           # Funciones de API
│   ├── types.ts         # Tipos de TypeScript
│   └── utils.ts         # Utilidades generales
```

## 🎨 Estrategia de Estilos

### CSS Modules para Componentes Principales

Los componentes principales utilizan **CSS Modules** para mantener un control granular sobre los estilos y evitar conflictos de nombres:

- `src/components/home-client.module.css` - Estilos de la página principal
- `src/app/cart/cart.module.css` - Estilos del carrito
- `src/app/product/[id]/product.module.css` - Estilos de detalle de producto
- `src/components/product-card.module.css` - Estilos de las tarjetas de producto
- `src/components/header.module.css` - Estilos del header

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

#### CartContext

- **Propósito**: Gestionar el carrito de compras
- **Funcionalidades**:
  - Agregar/eliminar productos del carrito
  - Persistencia en localStorage
  - Cálculo de totales y cantidades
  - Notificaciones toast al agregar productos
  - Optimización con useMemo y useCallback para evitar re-renders innecesarios

### Hooks de Viewport

La aplicación incluye hooks especializados para optimizar el rendimiento de imágenes y componentes basándose en el viewport visible:

#### useViewportItems

- **Propósito**: Calcular dinámicamente cuántos items son visibles en el viewport de la página principal
- **Funcionalidades**:
  - Detección automática de dimensiones de elementos usando `ResizeObserver`
  - Cálculo dinámico basado en altura del viewport, header, search y results
  - Optimización de carga de imágenes con `priority` prop
  - Rango configurable de items (mínimo 3, máximo 8)
  - Uso de refs de React en lugar de `document.querySelector`

#### useCartViewportItems

- **Propósito**: Calcular items visibles específicamente para la página del carrito
- **Funcionalidades**:
  - Detección automática de dimensiones de elementos del carrito
  - Cálculo basado en altura del viewport, header, título del carrito y resumen
  - Optimización conservadora (mínimo 1, máximo 4 items)
  - Adaptación automática a cambios de tamaño de ventana
  - Uso de `forwardRef` para componentes que necesitan recibir refs

**Beneficios de los hooks de viewport:**
- ✅ **Optimización de LCP**: Prioriza solo las imágenes visibles inicialmente
- ✅ **Sin magic numbers**: Dimensiones calculadas dinámicamente
- ✅ **React-friendly**: Uso de refs y hooks nativos de React
- ✅ **Performance**: Evita preload de imágenes no visibles
- ✅ **Responsive**: Se adapta automáticamente a diferentes tamaños de pantalla

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
   git clone https://github.com/juanortegagv/test-inditex.git
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

- **Búsqueda en tiempo real**: Filtra productos por nombre o marca en el cliente
- **Grid responsivo**: Muestra productos en una cuadrícula adaptativa
- **Optimización de rendimiento**: Componentes memoizados para evitar re-renders innecesarios
- **Manejo de errores**: Mensajes informativos para el usuario

### Detalle de Producto

- **Información completa**: Especificaciones, descripción, rating
- **Opciones de color**: Selección visual de colores disponibles
- **Opciones de almacenamiento**: Diferentes capacidades con precios
- **Productos similares**: Recomendaciones relacionadas

### Carrito de Compras

- **Persistencia local**: Los productos se mantienen entre sesiones
- **Gestión de cantidades**: Agregar/eliminar productos (reducción gradual de cantidades)
- **Cálculo automático**: Total y cantidad de items
- **Notificaciones**: Toast notifications al agregar productos
- **Optimización**: Componentes memoizados para mejor rendimiento
- **Optimización de viewport**: Carga prioritaria solo de imágenes visibles en el carrito

## 🧪 Testing

El proyecto incluye una suite de pruebas completa:

### Archivos de Prueba

- `__tests__/cart.test.tsx` - Pruebas del carrito
- `__tests__/home.test.tsx` - Pruebas de la página principal
- `__tests__/product-detail.test.tsx` - Pruebas de detalle de producto
- `__tests__/use-toast.test.tsx` - Pruebas del hook de toast

### Configuración

- **Jest** como framework de testing
- **React Testing Library** para testing de componentes
- **jsdom** como entorno de testing
- **Polyfill de ResizeObserver** para compatibilidad con hooks de viewport
- Configuración en `jest.config.js` y `jest.setup.js`

## 🔧 Configuración Técnica

### Next.js

- **App Router**: Utiliza el nuevo sistema de rutas de Next.js 15
- **Turbopack**: Compilación rápida en desarrollo
- **Image Optimization**: Configuración para múltiples dominios de imágenes
- **TypeScript**: Configuración estricta con verificación de tipos

### Optimizaciones de Rendimiento

- **React.memo**: Componentes memoizados para evitar re-renders innecesarios
- **useMemo y useCallback**: Optimización de cálculos y funciones
- **CSS Modules**: Estilos modulares para evitar conflictos
- **Next.js Image**: Optimización automática de imágenes
- **Hooks de Viewport**: Cálculo dinámico de items visibles para optimizar carga de imágenes
- **ResizeObserver**: Detección eficiente de cambios de tamaño de elementos
- **Refs de React**: Uso de refs tipados para acceso directo a elementos DOM
- **forwardRef**: Componentes que pueden recibir refs para mediciones precisas

**Desarrollado con ❤️ usando Next.js, Jest, Tailwind, CSS y TypeScript**
