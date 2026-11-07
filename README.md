# 🥢 Plantilla Maestra para Restaurantes — Panda Haus

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftorresallan534-bit%2Fplantilla-restaurante&env=MONGODB_URI,PAYLOAD_SECRET,NEXT_PUBLIC_SERVER_URL&envDescription=Configuraci%C3%B3n%20de%20MongoDB%20Atlas%20y%20Payload%20CMS)

Plantilla web de nivel agencia, ultra-rápida, moderna y de alta conversión diseñada para restaurantes, pizzerías, asaderos y negocios gastronómicos. Desarrollada con **Next.js 15 (App Router)**, **Payload CMS 3 (con MongoDB)**, **TypeScript**, **Tailwind CSS** y **Checkout directo a WhatsApp**.

---

## 🚀 Despliegue Inmediato en Vercel (1 Clic)

Haz clic en el siguiente enlace para desplegar tu propia instancia directamente en Vercel:

👉 **[Desplegar Plantilla en Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftorresallan534-bit%2Fplantilla-restaurante&env=MONGODB_URI,PAYLOAD_SECRET,NEXT_PUBLIC_SERVER_URL&envDescription=Configuraci%C3%B3n%20de%20MongoDB%20Atlas%20y%20Payload%20CMS)**

O impórtalo directamente desde tu panel de Vercel seleccionando el repositorio:
`https://github.com/torresallan534-bit/plantilla-restaurante`

---

## ✨ Características Principales

* **🎨 Diseño UI/UX Editorial de Alta Gama:** Inspirado en tendencias de Dribbble, Behance y Pinterest.
* **📱 Checkout Directo por WhatsApp:** Carrito lateral tipo slide-over que captura nombre, dirección y formatea el pedido con saltos de línea limpios para la API de WhatsApp (`wa.me`).
* **📦 100% Dinámico con Payload CMS 3:** Globals para la configuración del negocio (nombre, eslogan, horarios, WhatsApp, textos de "Conócenos") y Colecciones para Categorías y Productos.
* **⚡ 100% Serverless Vercel-Ready:** Sin necesidad de un servidor Node.js dedicado o VPS de pago; corre en el plan gratuito de Vercel.
* **🍱 Sección "Conócenos" Estilo Bento-Grid:** Grilla moderna de imágenes para destacar la preparación artesanal e ingredientes.
* **🛒 Carrito con Persistencia:** Los productos seleccionados se guardan automáticamente en `localStorage`.
* **🛡️ Roles de Usuario:** SuperAdmin (control total del sistema y usuarios) y Admin (gestión del menú y configuración básica).

---

## 🛠️ Variables de Entorno

Configura estas variables en tu archivo `.env.local` (local) o en los **Environment Variables** de tu proyecto en Vercel:

| Variable | Descripción | Ejemplo |
|---|---|---|
| `MONGODB_URI` | Cadena de conexión de MongoDB Atlas | `mongodb+srv://user:pass@cluster0.mongodb.net/restaurante-db` |
| `PAYLOAD_SECRET` | Clave criptográfica para JWT y sesiones del CMS | `clave-secreta-alfanumerica-32-caracteres` |
| `NEXT_PUBLIC_SERVER_URL` | URL pública del proyecto | `http://localhost:3000` o `https://tu-restaurante.vercel.app` |
| `NEXT_PUBLIC_RESTAURANT_NAME` | Nombre de respaldo del restaurante | `"Panda Arepas & Grill"` |
| `NEXT_PUBLIC_WHATSAPP_PHONE` | Teléfono de WhatsApp (con indicativo internacional) | `"573001234567"` |

---

## 💻 Desarrollo Local

```bash
# 1. Instalar dependencias
cmd /c "npm install"

# 2. Iniciar servidor de desarrollo
cmd /c "npm run dev"

# 3. Compilar para producción
cmd /c "npm run build"
```

* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **Panel Administrativo (Payload CMS):** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 👨‍💻 Autor y Créditos

Desarrollado por **Panda Haus Agencia Web**.
Repositorio oficial: [torresallan534-bit/plantilla-restaurante](https://github.com/torresallan534-bit/plantilla-restaurante)
