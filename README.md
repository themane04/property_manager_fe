# 🏢 Property Manager – Frontend

> A modern internal web tool for real estate management, built with **React**, **TypeScript**, and **Chakra UI**.  
> Developed as part of a school project for the M146 NoSQL module – now maintained as a personal portfolio project.

## 🎯 Purpose

This web app serves as a central interface for a real estate company to efficiently manage:

- 👥 Tenants
- 🏠 Rental Units
- 🏘️ Properties
- 📑 Rental Contracts
- 💵 Payments
- 🛠️ Maintenance Requests
- ✨ Features (Unit-specific amenities)

The goal was to provide a smooth and intuitive experience for internal staff to manage complex data structures with
ease.

---

## 🛠️ Tech Stack

### Frontend

| Tech         | Purpose                                |
|--------------|----------------------------------------|
| React + Vite | Fast SPA setup for component-based dev |
| TypeScript   | Strong typing for maintainability      |
| Chakra UI    | UI styling with accessibility built-in |
| Axios        | API communication                      |
| React Router | Client-side routing                    |

### Backend (See [Backend Repo](https://github.com/themane04/property_manager_be.git))

| Tech                  | Purpose                                  |
|-----------------------|------------------------------------------|
| Django                | Python web framework                     |
| Djongo                | MongoDB integration with Django ORM      |
| Django REST Framework | Building RESTful API                     |
| MongoDB               | Flexible NoSQL database for dynamic data |

---

## ✨ Features

- **Reusable Components**: Built flexible components for forms, list views, buttons, and dropdowns.
- **Dark Theme Ready**: Includes a polished global theme with dark mode support.
- **Fully Responsive**: Works on desktop and tablets.
- **CRUD for All Models**: Create, Read, Update, Delete for all data types.
- **Form + State Management**: Reusable `DynamicForm` powered by Chakra and form state hooks.
- **Relationship Handling**: Dynamic dropdowns linked to related MongoDB models (e.g. tenant → rental contract).
- **Modern UI**: Custom dashboard, card views, animations, and icon-based navigation.

---

## 🐳 Installation (With Docker)

```bash
# Clone the repo
git clone https://github.com/themane04/property_manager_fe.git
cd property_manager_fe

# Start the frontend container
docker compose up -d

# Stop containers
docker compose down
```
- The frontend will be available at: [`http://localhost:3000`](http://localhost:3000)

## 📦 Installation (Without Docker)

```bash
# Clone the repo
git clone https://github.com/themane04/property_manager_fe.git

# Navigate into the folder
cd property_manager_fe

# Install dependencies
npm install

# Start the dev server
npm run dev
```
- The frontend will be available at: [`http://localhost:5173`](http://localhost:5173)
