import {
  ThemeBranding,
  SalesShipping,
  HeroContentData,
  FooterContentData,
  AboutUsContentData,
  Category,
  Product,
} from '../types'

export const mockThemeBranding: ThemeBranding = {
  primaryColor: '#C2410C',
  secondaryColor: '#D97706',
  backgroundColor: '#FAF8F5',
  surfaceColor: '#FFFFFF',
  textColor: '#1C1917',
  logoUrl: '/logo/logo.svg',
}

export const mockSalesShipping: SalesShipping = {
  nombreRestaurante: 'Panda Arepas & Grill',
  tituloSitioWeb: 'Panda Arepas & Grill | Menú Digital & Pedidos por WhatsApp',
  descripcionSitioWeb:
    'Sabor auténtico del maíz peto artesanal y carnes a la brasa. Pide tu domicilio directamente a nuestro WhatsApp oficial.',
  numeroWhatsApp: '573001234567',
  mensajePredeterminado: 'Hola {restaurante}, soy {nombre}, para pedir:',
  tipoDomicilio: 'fijo',
  costoDomicilio: 5000,
  textoDomicilioPersonalizado: 'El precio se determina con el domiciliario',
  direccionFisica: 'Carrera 7 # 68-12, Zona Gourmet',
  horarios: [
    { dias: 'Lunes a Jueves', horas: '11:30 AM - 9:30 PM' },
    { dias: 'Viernes y Sábados', horas: '11:30 AM - 11:00 PM' },
    { dias: 'Domingos y Festivos', horas: '12:00 PM - 9:00 PM' },
  ],
  tituloFormularioCheckout: 'Datos de Entrega Inmediata',
  labelNombre: 'Tu Nombre Completo *',
  placeholderNombre: 'Ej. Juan Pérez',
  pedirTelefonoCliente: true,
  labelTelefono: 'Teléfono / WhatsApp de Contacto *',
  placeholderTelefono: 'Ej. 300 123 4567',
  labelDireccion: 'Dirección de Entrega *',
  placeholderDireccion: 'Ej. Cra 15 # 85-30 Apto 402',
  pedirNotas: true,
  labelNotas: 'Notas opcionales (salsas aparte, cubiertos, etc.)',
  placeholderNotas: 'Ej. Salsa de ajo aparte, timbre averiado',
  habilitarMetodosPago: true,
  labelMetodosPago: 'Método de Pago *',
  metodosPago: [
    { nombre: 'Efectivo contra entrega' },
    { nombre: 'Transferencia Nequi / Daviplata' },
    { nombre: 'Datáfono / Tarjeta a domicilio' },
  ],
  textoBotonCheckout: 'Enviar Pedido por WhatsApp',
  pieDePaginaCheckout: 'Pedido directo sin intermediarios ni cargos de servicio.',
}

export const mockHeroContent: HeroContentData = {
  tituloPrincipal: 'Panda Arepas & Grill',
  subtitulo: 'El verdadero sabor del maíz artesanal y la brasa viva.',
  descripcion:
    'Masa de maíz peto recién molido, dorada al carbón de leña y rellena con carnes ahumadas lentamente y quesos frescos. Haz tu pedido y recíbelo caliente en tu puerta.',
  badge: 'Auténtica Tradición & Sabor Artesanal',
  textoCTA: 'Ver Nuestro Menú',
  imagenFondoUrl: '/images/arepas-1.jpg',
  ratingText: '4.9 / 5 (más de 1.200 clientes felices)',
  platoInsigniaEtiqueta: 'Plato Insignia',
  platoInsigniaTitulo: 'Arepa Paisa Suprema al Carbón',
  tiempoDespachoTexto: 'Despacho en 35-45 min',
}

export const mockFooterContent: FooterContentData = {
  tituloSEO: 'Panda Arepas & Grill - Maestros del Carbón',
  descripcionSEO:
    'Auténtico maíz peto procesado artesanalmente día a día. Rellenos generosos y el mejor toque ahumado al carbón.',
  creditos: 'Desarrollado con pasión por Panda Haus Agencia Web',
  redesSociales: [
    { red: 'instagram', url: 'https://instagram.com' },
    { red: 'facebook', url: 'https://facebook.com' },
    { red: 'tiktok', url: 'https://tiktok.com' },
  ],
}

export const mockAboutUsContent: AboutUsContentData = {
  badge: 'Nuestra Historia & Pasión',
  titulo: 'Amor por el Maíz Peto y la Gastronomía Artesanal',
  parrafo1:
    'Nuestra historia comenzó con una receta familiar guardada por generaciones: moler maíz 100% natural, sin harinas procesadas, logrando esa textura crocante por fuera y suave por dentro que reconforta el alma.',
  parrafo2:
    'Rellenamos cada arepa al momento con carnes jugosas cocinadas a fuego lento durante 8 horas, quesos de campo frescos y salsas secretas elaboradas diariamente. Cada pedido es una celebración de sabor.',
  stats: [
    { numero: '10+', etiqueta: 'Años de Experiencia' },
    { numero: '100%', etiqueta: 'Maíz de Origen Local' },
    { numero: '4.9 ★', etiqueta: 'Satisfacción Clientes' },
    { numero: '15k+', etiqueta: 'Arepas Servidas' },
  ],
  imagen1Url: '/images/arepas-1.jpg',
  imagen2Url: '/images/arepas-2.jpg',
  imagen3Url: '/images/arepas-3.jpg',
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
    nombre: 'Arepa Choricera Artesanal (Edición Limitada)',
    precio: 18000,
    descripcion:
      'Chorizo santarrosano ahumado en leña de roble, cebollitas caramelizadas, chimichurri rústico y queso de hoja.',
    imagenUrl: '/images/arepas-2.jpg',
    categoria: 'parrilla-carbon',
    disponible: false, // Demostración del botón "Agotado"
    destacado: false,
  },
  {
    id: 'prod-6',
    nombre: 'Limonada de Coco & Frutas Frappé',
    precio: 9500,
    descripcion:
      'Cremosa leche de coco natural, zumo de limones recién exprimidos y fruta fresca batidos al punto de nieve.',
    imagenUrl: '/images/arepas-3.jpg',
    categoria: 'bebidas-artesanales',
    disponible: true,
    destacado: false,
    gruposOpciones: [
      {
        titulo: 'Elige el Sabor',
        requerido: true,
        opciones: [
          { nombre: 'Coco Tradicional' },
          { nombre: 'Cerezada' },
          { nombre: 'Mango Biche' },
          { nombre: 'Hierbabuena' },
        ],
      },
    ],
  },
  {
    id: 'prod-7',
    nombre: 'Super Combo Pareja Panda Grill',
    precio: 42000,
    descripcion:
      'Combo especial para compartir: 2 Arepas Especiales al gusto, 2 Bebidas y porción de papas rústicas con salsas.',
    imagenUrl: '/images/arepas-1.jpg',
    categoria: 'parrilla-carbon',
    disponible: true,
    destacado: true,
    gruposOpciones: [
      {
        titulo: 'Primera Arepa',
        requerido: true,
        opciones: [
          { nombre: 'Paisa Suprema con Chicharrón' },
          { nombre: 'Carne Mechada al Carbón' },
          { nombre: 'Pollo y Tocineta' },
        ],
      },
      {
        titulo: 'Segunda Arepa',
        requerido: true,
        opciones: [
          { nombre: 'Paisa Suprema con Chicharrón' },
          { nombre: 'Carne Mechada al Carbón' },
          { nombre: 'Pollo y Tocineta' },
        ],
      },
      {
        titulo: 'Bebidas del Combo',
        requerido: true,
        opciones: [
          { nombre: '2 Coca-Cola 400ml' },
          { nombre: '2 Postobón Manzana' },
          { nombre: '2 Limonadas de Coco' },
        ],
      },
    ],
  },
  {
    id: 'prod-8',
    nombre: 'Combo 4 Empanadas Tradicionales al Gusto',
    precio: 16000,
    descripcion:
      'Crujientes empanadas de maíz peto recién fritas acompañadas de ají casero. Elige tus 4 empanadas favoritas.',
    imagenUrl: '/images/arepas-2.jpg',
    categoria: 'arepas-especiales',
    disponible: true,
    destacado: true,
    gruposOpciones: [
      {
        titulo: 'Elige tus 4 empanadas',
        tipoSeleccion: 'multiple',
        limiteSeleccion: 4,
        requerido: true,
        opciones: [
          { nombre: 'Empanada de Carne Desmechada' },
          { nombre: 'Empanada de Pollo Criollo' },
          { nombre: 'Empanada de Queso y Maíz Tierno' },
          { nombre: 'Empanada de Chicharrón Crocante' },
        ],
      },
    ],
  },
]
