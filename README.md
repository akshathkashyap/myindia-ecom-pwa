# E-Commerce Progressive Web App

This is a Progressive Web App (PWA) for an e-commerce platform built with React. The application allows users to browse products, search for specific items, and manage their cart.

## Features

- **Home Page**: View a list of available products.
- **Search Page**: Search for products by name or description.
- **Cart Page**: View and manage items in your cart.
- **Routing**: Uses React Router DOM for client-side routing.
- **State Management**: Uses Redux and Redux Toolkit for global state management and localStorage for persistence.
- **Styling**: Styled with Tailwind CSS.
- **Service Worker**: Caches assets and provides offline capabilities.

## Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd <repository-name>
   ```
2. Install Dependencies:
    ```sh
    npm install
    ```
3. Create a .env file in the project root directory and add the following line to connect to the API:

    ```
    REACT_APP_API="https://9761-49-36-11-129.ngrok-free.app"
    ```

## Development

To start the development server at http://localhost:3000, run:

    npm start

## Deployed Version

To use the deployed version of the application, paste the following URL into your browser:

    https://main--myindia-ecom-pwa.netlify.app/
