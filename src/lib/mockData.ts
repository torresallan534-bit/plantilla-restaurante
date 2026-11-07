import { BusinessConfig, Category, Product } from '../types'

export const mockBusinessConfig: BusinessConfig = {
  nombreRestaurante: 'Panda Arepas & Grill',
  eslogan: 'El verdadero sabor del maíz artesanal y la brasa viva.',
  numeroWhatsApp: '573001234567',
  mensajePredeterminadoWhatsApp: 'Hola {restaurante}, soy {cliente}, para pedir lo siguiente:',
  logoUrl: '/logo/logo.svg',
  direccionFisica: 'Carrera 7 # 68-12, Zona Gourmet',
  horarios: [
    { dias: 'Lunes a Jueves', horas: '11:30 AM - 9:30 PM' },
    { dias: 'Viernes y Sábados', horas: '11:30 AM - 11:00 PM' },
    { dias: 'Domingos y Festivos', horas: '12:00 PM - 9:00 PM' },
  ],
  conocenosBadge: 'Tradición & Fuego Lento',
  conocenosTitulo: 'Amor por el Maíz Peto y la Gastronomía Artesanal',
  conocenosParrafo1:
    'Nuestra historia comenzó con una receta familiar guardada por generaciones: moler maíz 100% natural, sin harinas procesadas, logrando esa textura crocante por fuera y suave por dentro que reconforta el alma.',
  conocenosParrafo2:
    'Rellenamos cada arepa al momento con carnes jugosas cocinadas a fuego lento durante 8 horas, quesos de campo frescos y salsas secretas elaboradas diariamente. Cada pedido es una celebración de sabor.',
  stats: [
    { numero: '10+', etiqueta: 'Años de Experiencia' },
    { numero: '100%', etiqueta: 'Maíz de Origen Local' },
    { numero: '4.9 ★', etiqueta: 'Satisfacción Clientes' },
    { numero: '15k+', etiqueta: 'Arepas Servidas' },
  ],
}

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    nombre: 'Arepas Especiales',
    slug: 'arepas-especiales',
    icono: 'flame',
    orden: 1,
  },
  {
    id: 'cat-2',
    nombre: 'A la Parrilla & Carbón',
    slug: 'parrilla-carbon',
    icono: 'utensils',
    orden: 2,
  },
  {
    id: 'cat-3',
    nombre: 'Bebidas Artesanales',
    slug: 'bebidas-artesanales',
    icono: 'coffee',
    orden: 3,
  },
]

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    nombre: 'Arepa Paisa Suprema Panda',
    precio: 22000,
    descripcion:
      'Chicharrón carnudo crocante, plátano maduro caramelizado, queso campesino fresco rallado y aguacate hass en masa de maíz peto asada al carbón.',
    imagenUrl: '/images/arepas-1.jpg',
    categoria: 'arepas-especiales',
    disponible: true,
    destacado: true,
  },
  {
    id: 'prod-2',
    nombre: 'Arepa de Carne Mechada al Carbón',
    precio: 19500,
    descripcion:
      'Jugosa carne de res cocinada 8 horas al vacío con hogao criollo tradicional y doble porción de queso mozzarella fundido al grill.',
    imagenUrl: '/images/arepas-2.jpg',
    categoria: 'arepas-especiales',
    disponible: true,
    destacado: true,
  },
  {
    id: 'prod-3',
    nombre: 'Arepa Mixta Especial Panda Grill',
    precio: 21000,
    descripcion:
      'Pechuga de pollo desmechada al limón y hierbas, tocineta ahumada crujiente, maíz tierno dulce y fondue de queso blanco.',
    imagenUrl: '/images/arepas-3.jpg',
    categoria: 'arepas-especiales',
    disponible: true,
    destacado: false,
  },
  {
    id: 'prod-4',
    nombre: 'Arepa Reina de la Casa',
    precio: 18500,
    descripcion:
      'Nuestra interpretación de la reina: pollo tierno en cubos con mayonesa artesanal de cilantro, aguacate cremoso y queso gratinado.',
    imagenUrl: '/images/arepas-1.jpg',
    categoria: 'parrilla-carbon',
    disponible: true,
    destacado: true,
  },
  {
    id: 'prod-5',
    nombre: 'Arepa Choricera Artesanal',
    precio: 18000,
    descripcion:
      'Chorizo santarrosano ahumado en leña de roble, cebollitas caramelizadas, chimichurri rústico y queso de hoja.',
    imagenUrl: '/images/arepas-2.jpg',
    categoria: 'parrilla-carbon',
    disponible: true,
    destacado: false,
  },
  {
    id: 'prod-6',
    nombre: 'Limonada de Coco & Panela Frappé',
    precio: 9500,
    descripcion:
      'Cremosa leche de coco natural, zumo de limones recién exprimidos y panela orgánica batidos al punto de nieve.',
    imagenUrl: '/images/arepas-3.jpg',
    categoria: 'bebidas-artesanales',
    disponible: true,
    destacado: false,
  },
]
