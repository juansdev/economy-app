<p align="center">
  <img src="https://simpleicons.org/icons/html5.svg" style="filter:invert(1)" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">ECONOMY APP</h1>
</p>
<p align="center">
    <em>Proactive Finance Companion 🚀</em>
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
  <summary>Table of Contents</summary><br>

- [ Overview](#-overview)
- [ Features](#-features)
- [ Repository Structure](#-repository-structure)
- [ Modules](#-modules)
- [ Getting Started](#-getting-started)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
</details>
<hr>

##  Overview

The Economy-App is an open-source web application designed to simplify financial management for businesses. It features interactive interfaces for inputting essential data, such as Statement of Income, Cash Flow, and budgets for expenses like personnel, administrative, purchases, and sales. Its user-friendly forms offer adaptability, allowing multiple entries under each category. Enhancing the user experience is a responsive design that ensures compatibility with various devices and screen sizes. The Economy-App also integrates EmailJS for seamless communication through contact forms and an admin dashboard to manage submitted data efficiently. For enhanced security against spam and bots, it includes reCAPTCHA integration. Streamlined by manifest.json and powered by Start Bootstrap Creative v7.0.4, Economy-App strives to provide a visually appealing and professional experience while improving financial management for businesses of all sizes.

---

##  Features

| Feature                    | Description                                                                                                |
|-------------------------------|------------------------------------------------------------------------------------------------------------|
| ⚙️ **Architecture**            | Single-page web application built with HTML, CSS (Bootstrap), and JavaScript.                                      |
| 🔌 **Libraries/Frameworks**    | Uses Bootstrap for responsive design and EmailJS API for seamless email submission.                              |
| 🏫 **Functionality**          | Includes contact form, business data input forms for income statement, expenses budgets (personnel, administrative, purchases, sales), and dynamic form generation for added flexibility.           |
| 🌍 **Cross-platform compatibility**     | Designed to work on various screen sizes and devices.                                                       |
| 🔒 **Data Security**             | Email communication through the EmailJS API is secure as it follows industry best practices for encryption during transit. However, users should ensure proper password management.   |

---

##  Repository Structure

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

##  Modules

<details closed><summary>.</summary>

| File                                                                               | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---                                                                                | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [robots.txt](https://github.com/juansdev/economy-app/blob/master/robots.txt)       | In this repository for the economy-app, the robots.txt file is set to allow all web crawlers access to the entire application without any restrictions. By doing so, search engines can efficiently index and navigate through the apps contents, enhancing its online discoverability and SEO performance.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [index.html](https://github.com/juansdev/economy-app/blob/master/index.html)       | Ensures user inputs meet specified requirements before form submission, e.g., email format checks, field length checks, and non-empty fields.2. Create an AJAX function for email sending: Simplifies the form submission process by utilizing JavaScript to send an email without needing to refresh the page.3. Implement a simple captcha system: To prevent automated submissions and ensure that form input is legitimate.4. Design responsive email template: Customize the appearance of emails sent from the contact form, making sure it looks visually appealing on various screen sizes and devices.5. Incorporate email service for sending notifications: Choose an appropriate email service (e.g., SendGrid, Mailgun) to manage sending and receiving email notifications for successful or failed submission results.6. Create an admin dashboard with submissions display: Allow the site administrator to easily view and manage submitted contact forms from a single dashboard.7. Integrate reCAPTCHA for added security: Provides an extra layer of protection against spam and bot form submissions. |
| [manifest.json](https://github.com/juansdev/economy-app/blob/master/manifest.json) | Streamlines app installation and icon display. Manifest.json" optimizes EconomyApp, setting name, colors, start URL, description, and icons (including favicon), facilitating seamless user experience in web manifest-compliant browsers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

</details>

<details closed><summary>css</summary>

| File                                                                             | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---                                                                              | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| [styles.css](https://github.com/juansdev/economy-app/blob/master/css/styles.css) | In the given codebase, the `economy-app` directory houses the source code for an application. The main focus of this code resides in the `css` folder, particularly the file named `styles.css`. This file serves as a cornerstone for defining and enforcing a consistent visual style for the `economy-app`.The content within `styles.css` primarily includes declarations that reference an external CSS framework called Start Bootstrap-Creative v7.0.4. The choice of this specific CSS library signifies the intent to create a visually engaging, creative, and professional user interface for the `economy-app`.Within this file, style properties like font families, colors, layout grids, responsive design, animations, and transitions are configured. By using consistent styles across various components, this ensures that the application is harmonious and easy to navigate. This layer of abstraction in the codebase contributes significantly towards achieving the desired aesthetics, consistency, and maintainability within `economy-app`. |

</details>

<details closed><summary>js</summary>

| File                                                                                  | Summary                                                                                                                                                                                                                                                            |
| ---                                                                                   | ---                                                                                                                                                                                                                                                                |
| [scripts.js](https://github.com/juansdev/economy-app/blob/master/js/scripts.js)       | Enhances user experience by dynamically updating page title when a service button is clicked within the given JavaScript file. The interactive label adjusts based on users selection from available options, providing personalized content.                      |
| [send_email.js](https://github.com/juansdev/economy-app/blob/master/js/send_email.js) | Engages users by handling email submissions from contact forms, enhancing user interaction within the economy-app. This script employs EmailJS API to send emails seamlessly, providing a responsive and efficient communication channel for users and developers. |

</details>

<details closed><summary>js.economy</summary>

| File                                                                                                                            | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---                                                                                                                             | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [scripts_statement_of_income.js](https://github.com/juansdev/economy-app/blob/master/js/economy/scripts_statement_of_income.js) | In the `economy-app` repository, the specified JavaScript file, located at `js/economy/scripts_statement_of_income.js`, focuses on a key functionality of enabling users to input essential financial data related to their businesses in a structured manner within the applications user interface. This includes fields for the name of the business, the date for financial statements, sales income, and expenses, represented as statement_of_income_form_part_one". By providing an intuitive, dynamic interface for these inputs, this script enhances data input flexibility to meet specific business needs. |
| [scripts_cash_flow.js](https://github.com/juansdev/economy-app/blob/master/js/economy/scripts_cash_flow.js)                     | Data collectionAllows users to easily provide essential financial details through a user-friendly interface.2. **Form generationAutomatically creates dynamic input fields for multiple entries under each category (e.g., multiple lines for income, expenditure, and costs).3. **AccessibilityUses Bootstrap CSS classes for an appealing, responsive design that caters to a variety of screen sizes and devices.                                                                                                                                                                                                   |

</details>

<details closed><summary>js.economy.budgets</summary>

| File                                                                                                                                                          | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---                                                                                                                                                           | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [scripts_personnel_expenses_budget.js](https://github.com/juansdev/economy-app/blob/master/js/economy/budgets/scripts_personnel_expenses_budget.js)           | By utilizing this script, users can conveniently generate personnel expense budgets and provide essential data efficiently within the applications user interface.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [scripts_administrative_expenses_budget.js](https://github.com/juansdev/economy-app/blob/master/js/economy/budgets/scripts_administrative_expenses_budget.js) | This JavaScript file, `scripts_administrative_expenses_budget.js`, located at the path `js/economy/budgets/scripts_administrative_expenses_budget.js` within the repository `economy-app`, plays a crucial role in managing and generating budgets specifically for administrative expenses within the larger architecture of the economic application.The script binds click events to buttons that generate an administrative expenses budget, using HTML forms containing necessary inputs like the name or number of the period, production planned, final inventory of materials, initial inventory, and the budgeted spending for purchases. To facilitate further data entry, it provides options to add additional input fields for each section as required, making the process more adaptable to specific circumstances. Overall, this script empowers users with a streamlined approach to manage and generate comprehensive administrative expense budgets in the `economy-app`. |
| [scritps_buys_budget.js](https://github.com/juansdev/economy-app/blob/master/js/economy/budgets/scritps_buys_budget.js)                                       | Js/economy/budgets/scripts_buys_budget.js in the economy-app repositoryPurpose & Main Features: This JavaScript code, placed within the budgets subdirectory, serves to facilitate the generation of budgets specifically for purchases within the Economy app. It attaches click event listeners to all buttons that generate a purchasing budget (`.generate-buys-budget`). Upon clicking one of these buttons, it dynamically generates a form containing fields such as:-Name of the time period (optional)-Budgeted production in units-Final inventory of material-Initial inventory-Total budget for purchases.The generated form allows users to add multiple entries to each section, offering flexibility and customization for detailed budget planning.                                                                                                                                                                                                                          |
| [scripts_sales_budget.js](https://github.com/juansdev/economy-app/blob/master/js/economy/budgets/scripts_sales_budget.js)                                     | This JavaScript file, `js/economy/budgets/scripts_sales_budget.js`, resides in the `economy-app` repository and is a crucial component of its interactive UI, particularly focusing on the sales budget functionalities within the broader application context.In more simplified terms, this JavaScript file facilitates the process of generating and managing the sales budget in your financial application. It captures user input for relevant sales metrics such as the name or number of a specific period, units sold, price per unit, and total sales, allowing users to dynamically add multiple entries for each field if necessary. The key feature here is its dynamic form generation mechanism that enhances usability within this app, making it more flexible and efficient for tracking budgets in real-time.                                                                                                                                                             |

</details>

---

##  Getting Started

###  Installation

<h4>From <code>source</code></h4>

> 1. Clone the economy-app repository:
>
> ```console
> $ git clone https://github.com/juansdev/economy-app
> ```
>
> 2. Change to the project directory:
> ```console
> $ cd economy-app
> ```

###  Usage

<h4>From <code>source</code></h4>

> Run economy-app using the command below:
> ```console
> $ node app.js
> ```