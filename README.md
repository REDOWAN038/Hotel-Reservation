# Hotel Reservation System

## Overview

The Hotel Reservation System is a web application built on the MERN (MongoDB, Express.js, React.js, Node.js) stack with Tailwind CSS for styling. It allows users to list hotels and book rooms based on their criteria. Payments are handled securely through Stripe, forms are managed using React Hook Form, and hotel images are uploaded to Cloudinary.

## Features

-   **User Authentication:** Secure user registration and login functionality.

-   **Hotel Listing:** Users can list their hotels with details such as name, location, description, facilities, star rating, and images.

-   **Room Booking:** Users can search for hotels based on destination, dates, number of adults/children, and other criteria. They can view available rooms, prices, and amenities, and book rooms.

-   **Payment Integration:** Seamless integration with Stripe for handling payments securely.

-   **Form Handling:** Forms are managed efficiently using React Hook Form for validation and submission.

-   **Image Upload:** Hotel images are uploaded to Cloudinary for storage and retrieval.

-   **Search and Filters:** Advanced search functionality with filters for price range, star ratings, facilities, etc.

-   **Responsive Design:** Mobile-friendly design to ensure seamless user experience across devices.

## Tech Stack

**Frontend:** React.js, React Router, Redux (optional for state management), Tailwind CSS

**Backend:** Node.js, Express.js

**Database:** MongoDB (using Mongoose ODM)

**Authentication:** JSON Web Tokens (JWT) for secure authentication

**Payment:** Stripe for payment processing

**Form Handling:** React Hook Form for managing forms

**Image Upload:** Cloudinary for storing and managing hotel images

**Other Libraries:** Axios (for API requests)

## API Reference

#### User Regiser

```http
  post /api/v1/user/register
```

### User Authentication

#### User Login

```http
  post /api/v1/auth/login
```

#### User Logout

```http
  post /api/v1/auth/logout
```

### Admin Authentication

#### Admin Login

```http
  post /api/v1/auth/admin/login
```

#### Admin Logout

```http
  post /api/v1/auth/admin/logout
```

### Admin Hotel Routes

#### Add Hotel

```http
  post /api/v1/my-hotels
```

#### Get Hotels

```http
  get /api/v1/my-hotels
```

#### Get Single Hotel

```http
  get /api/v1/my-hotels/:id
```

#### Update Hotel

```http
  put /api/v1/my-hotels/:id
```

#### Delete Hotel

```http
  delete /api/v1/my-hotels/:id
```

### User Hotel Routes

#### Get Hotels

```http
  get /api/v1/hotels
```

#### Get Search Hotels

```http
  get /api/v1/hotels/search
```

#### Get Single Hotels

```http
  get /api/v1/hotels/:id
```

### Admin Room Routes

#### Create Room

```http
  post /api/v1/my-rooms
```

#### Get Rooms

```http
  get /api/v1/my-rooms
```

#### Get Single Room

```http
  get /api/v1/my-rooms/:id
```

#### Update Room

```http
  put /api/v1/my-rooms/:id
```

#### Delete Room

```http
  delete /api/v1/my-rooms/:id
```

### User Room Routes

#### Get Single Room

```http
  get /api/v1/rooms/:id
```

#### Booking Payment Intent

```http
  post /api/v1/rooms/booking/payment-intent/:id
```

#### Booking Room

```http
  post /api/v1/rooms/booking/:hotelId/:roomId
```

### Admin Booking Routes

#### Get Bookings

```http
  get /api/v1/my-bookings
```

### User Booking Routes

#### Get Bookings

```http
  get /api/v1/bookings
```

## Environment Variables

To run this project, you will need to add the following environment variables to your server .env file

`SERVER_PORT`

`MONGO_URL`

`JWT_ACESS_KEY`

`CLOUDINARY_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_SECRET_KEY`

`CLOUDINARY_FOLDER`

`STRIPE_SECRET_KEY`

To run this project, you will need to add the following environment variables to your client .env.local file

`VITE_SERVER_URL`

`VITE_ADMIN_URL`

`VITE_STRIPE_PUB_KEY`

To run this project, you will need to add the following environment variables to your admin .env.local file

`VITE_SERVER_URL`

## Run Locally

**Prerequisites :**

-   Node.js (version >= 20.0.0)
-   npm (or yarn)
-   MongoDB Atlas account (for cloud database) or local MongoDB setup
-   Stripe account (for payment integration)
-   Cloudinary account (for image upload)

Clone the project

```bash
  git clone https://github.com/REDOWAN038/Hotel-Reservation.git
```

### To Run Server

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Server URL (provide port at environment varaible)

```bash
  http://localhost:${port}
```

### To Run Client Frontend

Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the client

```bash
  npm run dev
```

Client URL

```bash
  http://localhost:5173
```

### To Run Admin Frontend

Go to the admin directory

```bash
  cd admin
```

Install dependencies

```bash
  npm install
```

Start the admin

```bash
  npm run dev
```

Admin URL

```bash
  http://localhost:5174
```
