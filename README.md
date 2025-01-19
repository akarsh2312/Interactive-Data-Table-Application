# Interactive Data Table Application

This is a web application that allows users to log in and view data from a Google Sheets document in an interactive table. The application includes features such as sorting, filtering, and pagination.

## Features

1. **Login Page**
   - Simple login page with the following credentials:
     - Username: demo
     - Password: demo

2. **Data Table Display**
   - Displays data from a Google Sheets document after successful login.

3. **Table Functionality**
   - **Sorting**: Implemented sorting functionality for all columns in the table.
   - **Filtering**: Added a search input that filters the table based on the "Domain Name" column.

4. **Deployment**
   - Deployed the application using Vercel.

## Technical Guidelines

- Used React for building the application.
- Implemented efficient data handling and rendering techniques for optimal table performance.
- Ensured responsive design for various screen sizes.
- Handled errors gracefully during data fetching and user interactions.

## Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:akarsh2312/Interactive-Data-Table-Application.git

2. Install dependencies:
   ```sh
    npm install

3. Create a .env file in the root directory with the following content:
   ```sh
   VITE_SHEET_ID=Your_SHEET_ID
   VITE_API_KEY=YOUR_GOOGLE_SHEETS_API_KEY
   VITE_SHEET_NAME=Sheet1

4. Start the development server:
  ```sh
  npm run dev
