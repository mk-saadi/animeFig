# E-Commerce Website with Payment Integration

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Screenshots](#screenshots)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running the Application](#running-the-application)
-   [Project Structure](#project-structure)
-   [Payment Integration](#payment-integration)
-   [Contributing](#contributing)

## Introduction

This is a full-stack e-commerce website built with modern web technologies. It allows users to browse products, add them to the cart, and proceed to a secure checkout with payment integration using Stripe. This project showcases best practices in modern web development, including performance optimizations and state management.

## Features

-   User authentication (Firebase)
-   Product browsing and filtering
-   Shopping cart functionality
-   Stripe payment integration
-   Responsive design (Tailwind CSS)
-   Search functionality
-   User reviews and ratings
-   Order tracking

## Tech Stack

**Frontend:**

-   [Vite](https://vitejs.dev/) - Fast build tool
-   [React](https://reactjs.org/) - Frontend library for building user interfaces
-   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
-   [React Router](https://reactrouter.com/) - Client-side routing
-   [Stripe](https://stripe.com/) - Payment processing

**Backend:**

-   [Firebase](https://firebase.google.com/) - Authentication and database for user management
-   MongoDB - NoSQL cloud database for product and order data

**Others:**

-   [React Query](https://react-query.tanstack.com/) - Data fetching and state management
-   [Axios](https://axios-http.com/) - HTTP client for API requests
-   [Node.js](https://nodejs.org/) and Express

## Screenshots

_Include some screenshots here of your e-commerce website interface, product page, cart, checkout, etc._

## Getting Started

### Prerequisites

To run this project, you'll need to have the following installed:

-   [Node.js](https://nodejs.org/en/download/)
-   [Git](https://git-scm.com/)
-   Firebase account for project setup
-   Stripe account for payment integration

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mk-saadi/animeFig.git
    ```

2. Navigate into the project directory:

    ```bash
    cd animeFig
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Set up your environment variables by creating a `.env.local` file at the root of the project:

    ```bash
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
    ```

### Running the Application

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Open your browser and go to:

    ```bash
    http://localhost:5173/
    ```

3. For the production build, run:

    ```bash
    npm run build
    ```

## Project Structure

```bash
├── src/
│   ├── assets/            # image files
│   ├── components/        # Pages, reusable components etc.
│   ├── index.css          # Main CSS styling file
│   └── main.jsx           # Entry point
├── .env                   # Environment variables
├── package.json           # Project metadata and dependencies
├── README.md              # Project documentation
└── vite.config.js         # Vite configuration

```
