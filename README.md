<p align="center">
  <img src="https://simpleicons.org/icons/html5.svg" style="filter:invert(1)" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">ECONOMY</h1>
</p>
<p align="center">
    <em>Compañero Financiero Proactivo 🚀</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/juansdev/economy-app?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/juansdev/economy-app?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/juansdev/economy-app?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/juansdev/economy-app?style=default&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>

<br><!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de Contenidos</summary><br>

- [ Descripción general](#-descripción-general)
- [ Características](#-características)
- [ Estructura del repositorio](#-estructura-del-repositorio)
- [ Módulos](#-módulos)
- [ Comenzando](#-comenzando)
  - [ Instalación](#-instalación)
  - [ Uso](#-uso)
</details>
<hr>

##  Descripción general

La Economy-App es una aplicación web de código abierto diseñada para simplificar la gestión financiera de las empresas. Cuenta con interfaces interactivas para ingresar datos esenciales, como el Estado de Resultados, Flujo de Caja y presupuestos para gastos como personal, administración, compras y ventas. Sus formularios amigables ofrecen adaptabilidad, permitiendo múltiples entradas bajo cada categoría. La experiencia del usuario se mejora con un diseño responsivo que asegura compatibilidad con diversos dispositivos y tamaños de pantalla. Economy-App también integra EmailJS para una comunicación fluida a través de formularios de contacto y un panel de administración para gestionar los datos enviados de manera eficiente. Para una mayor seguridad contra el spam y los bots, incluye integración con reCAPTCHA. Optimizada por manifest.json y potenciada por Start Bootstrap Creative v7.0.4, Economy-App se esfuerza por proporcionar una experiencia visualmente atractiva y profesional mientras mejora la gestión financiera para empresas de todos los tamaños.

---

##  Características

| Característica                       | Descripción                                                                                                           |
|--------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| ⚙️ **Arquitectura**                  | Aplicación web de una sola página construida con HTML, CSS (Bootstrap) y JavaScript.                                  |
| 🔌 **Bibliotecas/Frameworks**        | Utiliza Bootstrap para diseño responsivo y la API de EmailJS para envío de correos electrónico sin problemas.         |
| 🏫 **Funcionalidad**                 | Incluye un formulario de contacto, formularios de entrada de datos empresariales para estado de resultados, presupuestos de gastos (personal, administrativo, compras, ventas) y generación dinámica de formularios para mayor flexibilidad. |
| 🌍 **Compatibilidad multiplataforma** | Diseñada para funcionar en varios tamaños de pantalla y dispositivos.                                                  |
| 🔒 **Seguridad de datos**            | La comunicación por correo a través de la API de EmailJS es segura ya que sigue las mejores prácticas de la industria para encriptación durante la transmisión. Sin embargo, los usuarios deben asegurar una adecuada gestión de contraseñas. |

---

##  Estructura del repositorio

```sh
└── economy-app/
    ├── LICENSE
    ├── README.md
    ├── assets
    │   ├── favicon.ico
    │   └── img
    ├── css
    │   └── styles.css
    ├── index.html
    ├── js
    │   ├── economy
    │   ├── scripts.js
    │   └── send_email.js
    ├── manifest.json
    └── robots.txt
```

---

##  Módulos

Aquí está la traducción al español de la información proporcionada:

<details closed><summary>.</summary>

| Archivo                                                                           | Resumen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|-----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [robots.txt](https://github.com/juansdev/economy-app/blob/master/robots.txt)     | En este repositorio de la aplicación Economy, el archivo robots.txt está configurado para permitir a todos los rastreadores web el acceso completo a la aplicación sin restricciones. De esta manera, los motores de búsqueda pueden indexar y navegar eficientemente por el contenido de la aplicación, mejorando su descubribilidad en línea y el rendimiento SEO.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [index.html](https://github.com/juansdev/economy-app/blob/master/index.html)     | Asegura que las entradas del usuario cumplan con los requisitos especificados antes de enviar el formulario, por ejemplo, comprobaciones del formato del correo electrónico, longitud de los campos y campos no vacíos.2. Crea una función AJAX para el envío de correos: Simplifica el proceso de envío del formulario utilizando JavaScript para enviar un correo electrónico sin necesidad de actualizar la página.3. Implementa un sistema simple de captcha: Para evitar envíos automatizados y garantizar que la entrada del formulario sea legítima.4. Diseña una plantilla de correo electrónico responsiva: Personaliza la apariencia de los correos electrónicos enviados desde el formulario de contacto, asegurando que se vean visualmente atractivos en varios tamaños de pantalla y dispositivos.5. Incorpora un servicio de correo para el envío de notificaciones: Elige un servicio de correo adecuado (por ejemplo, SendGrid, Mailgun) para gestionar el envío y la recepción de notificaciones por correo electrónico sobre resultados de envíos exitosos o fallidos.6. Crea un panel de administración con visualización de envíos: Permite al administrador del sitio ver y gestionar fácilmente los formularios de contacto enviados desde un solo panel.7. Integra reCAPTCHA para mayor seguridad: Proporciona una capa adicional de protección contra el spam y los envíos de formularios de bots. |
| [manifest.json](https://github.com/juansdev/economy-app/blob/master/manifest.json) | Optimiza la instalación de la aplicación y la visualización del icono. "manifest.json" optimiza EconomyApp, estableciendo nombre, colores, URL de inicio, descripción e iconos (incluido favicon), facilitando una experiencia de usuario fluida en los navegadores compatibles con el manifiesto web.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

</details>

<details closed><summary>css</summary>

| Archivo                                                                           | Resumen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [styles.css](https://github.com/juansdev/economy-app/blob/master/css/styles.css) | En el código base proporcionado, el directorio `economy-app` alberga el código fuente de una aplicación. El enfoque principal de este código reside en la carpeta `css`, particularmente en el archivo llamado `styles.css`. Este archivo sirve como piedra angular para definir y mantener un estilo visual consistente para la `economy-app`.El contenido dentro de `styles.css` incluye principalmente declaraciones que hacen referencia a un marco de CSS externo llamado Start Bootstrap-Creative v7.0.4. La elección de esta biblioteca CSS específica señala la intención de crear una interfaz de usuario visualmente atractiva, creativa y profesional para la `economy-app`.Dentro de este archivo, se configuran propiedades de estilo como familias de fuentes, colores, rejillas de diseño, diseño responsivo, animaciones y transiciones. Al usar estilos consistentes en varios componentes, se asegura que la aplicación sea armoniosa y fácil de navegar. Esta capa de abstracción en el código base contribuye significativamente a lograr la estética deseada, la consistencia y la mantenibilidad dentro de `economy-app`. |

</details>

<details closed><summary>js</summary>

| Archivo                                                                          | Resumen                                                                                                                                                                                                                                                                                                                                             |
|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [scripts.js](https://github.com/juansdev/economy-app/blob/master/js/scripts.js) | Mejora la experiencia del usuario al actualizar dinámicamente el título de la página cuando se hace clic en un botón de servicio dentro del archivo JavaScript proporcionado. La etiqueta interactiva se ajusta según la selección del usuario entre las opciones disponibles, proporcionando contenido personalizado. |
| [send_email.js](https://github.com/juansdev/economy-app/blob/master/js/send_email.js) | Involucra a los usuarios manejando los envíos de correos electrónicos desde los formularios de contacto, mejorando la interacción del usuario dentro de la economy-app. Este script emplea la API de EmailJS para enviar correos electrónicos sin problemas, proporcionando un canal de comunicación receptivo y eficiente para usuarios y desarrolladores. |

</details>

<details closed><summary>js.economy</summary>

| Archivo                                                                                                                    | Resumen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|----------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [scripts_statement_of_income.js](https://github.com/juansdev/economy-app/blob/master/js/economy/scripts_statement_of_income.js) | En el repositorio `economy-app`, el archivo JavaScript especificado, ubicado en `js/economy/scripts_statement_of_income.js`, se centra en una funcionalidad clave de permitir a los usuarios ingresar datos financieros esenciales relacionados con sus negocios de manera estructurada dentro de la interfaz de usuario de la aplicación. Esto incluye campos para el nombre del negocio, la fecha de los estados financieros, ingresos por ventas y gastos, representados como statement_of_income_form_part_one". Al proporcionar una interfaz dinámica e intuitiva para estas entradas, este script mejora la flexibilidad de entrada de datos para satisfacer las necesidades específicas del negocio. |
| [scripts_cash_flow.js](https://github.com/juansdev/economy-app/blob/master/js/economy/scripts_cash_flow.js)                 | Recopilación de datosPermite a los usuarios proporcionar fácilmente detalles financieros esenciales a través de una interfaz fácil de usar.2. **Generación de formulariosCrea automáticamente campos de entrada dinámicos para múltiples entradas bajo cada categoría (por ejemplo, múltiples líneas para ingresos, gastos y costos).3. **AccesibilidadUtiliza clases de CSS de Bootstrap para un diseño atractivo y responsivo que se adapta a una variedad de tamaños de pantalla y dispositivos.                                                                                                                                                                                                                      |

</details>

<details closed><summary>js.economy.budgets</summary>

| Archivo                                                                                                                                                    | Resumen                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [scripts_personnel_expenses_budget.js](https://github.com/juansdev/economy-app/blob/master/js/economy/budgets/scripts_personnel_expenses_budget.js) | Utilizando este script, los usuarios pueden generar cómodamente presupuestos de gastos de personal y proporcionar datos esenciales de manera eficiente dentro de la interfaz de usuario de la aplicación.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [scripts_administrative_expenses_budget.js](https://github.com/juansdev/economy-app/blob/master/js/economy/budgets/scripts_administrative_expenses_budget.js) | Este archivo JavaScript, `scripts_administrative_expenses_budget.js`, ubicado en la ruta `js/economy/budgets/scripts_administrative_expenses_budget.js` dentro del repositorio `economy-app`, juega un papel crucial en la gestión y generación de presupuestos específicamente para gastos administrativos dentro de la arquitectura más amplia de la aplicación económica.El script enlaza eventos de clic a botones que generan un presupuesto de gastos administrativos, utilizando formularios HTML que contienen entradas necesarias como el nombre o número del período, producción planificada, inventario final de materiales, inventario inicial y el gasto presupuestado para compras. Para facilitar la entrada adicional de datos, proporciona opciones para agregar campos de entrada adicionales para cada sección según sea necesario, haciendo el proceso más adaptable a circunstancias específicas. En general, este script permite a los usuarios gestionar y generar presupuestos administrativos de manera integral en la `economy-app`. |
| [scritps_buys_budget.js](https://github.com/juansdev/economy-app/blob/master/js/economy/budgets/scritps_buys_budget.js)                               | Js/economy/budgets/scripts_buys_budget.js en el repositorio economy-appPropósito y características principales: Este código JavaScript, ubicado dentro del subdirectorio de presupuestos, facilita la generación de presupuestos específicamente para compras dentro de la aplicación Economy. Adjunta oyentes de eventos de clic a todos los botones que generan un presupuesto de compras (`.generate-buys-budget`). Al hacer clic en uno de estos botones, genera dinámicamente un formulario que contiene campos como:-Nombre del período (opcional)-Producción presupuestada en unidades-Inventario final del material-Inventario inicial-Presupuesto total para compras.El formulario generado permite a los usuarios agregar múltiples entradas a cada sección, ofreciendo flexibilidad y personalización para una planificación detallada del presupuesto.                                                                                                                                                                                             |
| [scripts_sales_budget.js](https://github.com/juansdev/economy-app/blob/master/js/economy/budgets/scripts_sales_budget.js)                           | Este archivo JavaScript, `js/economy/budgets/scripts_sales_budget.js`, reside en el repositorio `economy-app` y es un componente crucial de su interfaz de usuario interactiva, particularmente enfocado en las funcionalidades del presupuesto de ventas dentro del contexto más amplio de la aplicación. En términos simplificados, este archivo JavaScript facilita el proceso de generación y gestión del presupuesto de ventas en su aplicación financiera. Captura la entrada del usuario para métricas de ventas relevantes como el nombre o número de un período específico, unidades vendidas, precio por unidad y ventas totales, permitiendo a los usuarios agregar dinámicamente múltiples entradas para cada campo si es necesario. La característica clave aquí es su mecanismo de generación dinámica de formularios que mejora la usabilidad dentro de esta aplicación, haciéndola más flexible y eficiente para el seguimiento de presupuestos en tiempo real.                                                                                |

</details>

---

##  Comenzando

###  Instalación

<h4>Desde <code>source</code></h4>

> 1. Clone el repositorio economy-app:
>
> ```console
> $ git clone https://github.com/juansdev/economy-app
> ```
>
> 2. Cambia al directorio del proyecto:
> ```console
> $ cd economy-app
> ```

###  Uso

<h4>Desde <code>source</code></h4>

> Levanta economy-app abriendo el index.html.
> Si deseas habilitar el "Contactanos", en el archivo "send_email" alojado en la carpeta "JS". Debes de cambiar los valores "Email_Template" y "User_ID", tambien en el archivo "index.html" debes de cambiar el valor "User_ID", todos estos datos lo obtienes registrandote en la pagina de EmailJS.