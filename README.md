# PetHouse

A comprehensive pet adoption and care platform designed to connect pet lovers with their perfect companions.

## Purpose

PetHouse is a modern web application that facilitates pet adoption by providing a seamless platform where users can browse available pets, submit adoption requests, track their adoption journey, and access expert pet care tips. The platform aims to promote responsible pet adoption and provide comprehensive support to both pet owners and adopters.

## Live URL

https://pethouse-delta.vercel.app/

## Features

- **Pet Discovery & Search** - Browse and search through a comprehensive catalog of available pets with advanced filtering options
- **User Authentication** - Secure login and signup system with email-based authentication
- **Adoption Request System** - Submit and track adoption requests with real-time status updates
- **User Dashboard** - Personalized dashboard for users to manage their pet listings, adoption requests, and tracked adoption journeys
- **Pet Listings Management** - Add, edit, and manage pet listings with detailed information and images
- **Pet Care Tips** - Access expert advice and guides on pet care, health, and wellness
- **Adoption Journey Tracking** - Follow the complete adoption process from request submission to completion
- **Responsive Design** - Fully responsive interface that works seamlessly on desktop, tablet, and mobile devices

## NPM Packages Used

### Core Dependencies

- **next** 
- **react** 
- **react-dom**

### Authentication & Database

- **better-auth** (1.6.11) - Modern authentication library
- **@better-auth/mongo-adapter** (1.6.11) - MongoDB adapter for better-auth
- **mongodb** (7.2.0) - MongoDB driver for Node.js

### UI & Styling

- **@heroui/styles**
- **tailwindcss**
- **framer-motion**

### Icons & Graphics

- **react-icons** 
- **lucide-react**
- **@gravity-ui/icons**

### Notifications & Utilities

- **react-toastify**

### Development Dependencies

- **eslint** 
- **eslint-config-next**
- **babel-plugin-react-compiler**
- **@tailwindcss/postcss**

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Build & Production

To build for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Technology Stack

- **Frontend Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS with PostCSS
- **Authentication**: Better Auth with MongoDB
- **Database**: MongoDB
- **Animations**: Framer Motion
- **UI Components**: HeroUI
- **Icons**: React Icons, Lucide React, Gravity UI Icons
- **Notifications**: React Toastify
- **Deployment**: Vercel


