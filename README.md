# 🧠 Personal Digital Space

**Personal Digital Space** es una aplicación **full-stack** desarrollada bajo el **patrón arquitectónico MVC (Modelo - Vista - Controlador)**. Su objetivo es ofrecer un entorno digital personal donde el usuario pueda **gestionar notas, recuerdos, línea de tiempo y cumplidos**, todo dentro de una interfaz moderna, fluida y bien estructurada.

---

## 🚀 Tecnologías utilizadas

### **Frontend**

* ⚛️ **React** – Para construir interfaces dinámicas y modulares.
* 🟦 **TypeScript** – Mejora la mantenibilidad y fiabilidad del código con tipado estático.
* 🎨 **TailwindCSS** – Estilo moderno y adaptativo basado en utilidades.
* 🧩 **HTML5 & CSS3** – Base sólida para la estructura y diseño visual.

### **Backend**

* 🟩 **Node.js** – Entorno de ejecución de JavaScript en el servidor.
* ⚙️ **Express.js** – Framework que gestiona rutas, middlewares y controladores.

### **Base de datos**

* 🐘 **PostgreSQL** – Base de datos relacional confiable y potente.

---

## 🧩 Arquitectura MVC

El backend sigue el patrón **MVC (Modelo - Vista - Controlador)**, separando claramente la lógica de negocio, la estructura de datos y las rutas de acceso.

* **Modelos (Models):** Definen la estructura de los datos y las interacciones con la base de datos.
* **Controladores (Controllers):** Procesan la lógica de negocio y gestionan las peticiones/respuestas.
* **Rutas (Routes):** Definen los endpoints y conectan las peticiones con los controladores.

---

## 📁 Estructura del proyecto

```
src/
├── config/        # Configuración general (conexión DB, variables de entorno, etc.)
├── controllers/   # Lógica de negocio y manejo de peticiones
├── models/        # Definición de modelos y esquemas de datos
├── routes/        # Definición de rutas y endpoints
├── types/         # Tipos y definiciones de TypeScript
├── utils/         # Funciones auxiliares y utilitarias
├── app.ts         # Configuración principal de la aplicación Express
└── server.ts      # Inicialización del servidor
```

---

## 📌 Características principales

* ✏️ Módulo de **Notas personales** (crear, leer, actualizar, eliminar).
* 📷 **Gestión de recuerdos** con imágenes.
* 🕰️ **Línea de tiempo** interactiva.
* 💬 Sección de **Cumplidos y reflexiones**.
* 🔐 Arquitectura modular, escalable y fácil de mantener.

---

## 🌐 Repositorio

🔗 **GitHub:** [ISAASPWDI/love-app-backend](https://github.com/ISAASPWDI/love-app-backend)

---

## 📆 Estado del proyecto

✅ **Completado (2024)**
El proyecto está finalizado, documentado y optimizado para presentación técnica o portafolio profesional.

---

> 💡 **Personal Digital Space** demuestra el dominio del desarrollo full-stack con una arquitectura limpia, escalable y basada en tecnologías modernas.
