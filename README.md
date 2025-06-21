# AMRR Assignment Project

A modern web application built with Next.js, React 19, and Tailwind CSS that demonstrates user authentication and item management functionality using local storage.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How to Use](#how-to-use)
- [Code Architecture](#code-architecture)
- [Component Overview](#component-overview)
- [Data Storage](#data-storage)
- [UI Components](#ui-components)

## Overview

This project is a Next.js application that implements user authentication and item management functionality. It uses local storage to persist data between sessions, avoiding the need for a backend server. The application features a modern UI built with Tailwind CSS and shadcn/ui components.

## Features

- **User Authentication**

  - User registration (signup)
  - User login
  - Protected routes
  - Session management using local storage

- **Item Management**

  - Create new items
  - View items in a grid layout
  - View item details
  - Update existing items
  - Delete items
  - Image carousel for item images

- **UI/UX**
  - Responsive design
  - Dark/light theme support
  - Toast notifications
  - Modal dialogs
  - Confirmation dialogs
  - Form validations

## Tech Stack

- **Next.js 15** - React framework
- **React 19** - Frontend library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Zod** - Schema validation
- **React Hook Form** - Form handling
- **LocalStorage** - Client-side data storage

## Project Structure

```
/
├── app/                    # Next.js app router pages
│   ├── add/                # Add new item page
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout
│   └── clientLayout.tsx    # Client-side layout wrapper
│
├── components/             # Reusable components
│   ├── auth/               # Authentication related components
│   ├── ui/                 # UI components (shadcn/ui)
│   ├── confirm-dialog.tsx  # Confirmation dialog
│   ├── image-carousel.tsx  # Image carousel
│   ├── item-form.tsx       # Item creation/edit form
│   ├── item-grid.tsx       # Grid display for items
│   ├── item-modal.tsx      # Modal for item details
│   └── theme-provider.tsx  # Theme context provider
│
├── contexts/               # React context providers
│   ├── auth-context.tsx    # Authentication context
│   └── items-context.tsx   # Item management context
│
├── hooks/                  # Custom React hooks
│   ├── use-mobile.tsx      # Hook for mobile detection
│   └── use-toast.ts        # Hook for toast notifications
│
├── lib/                    # Utility functions and types
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Utility functions
│
└── public/                 # Static assets
    └── placeholder-*.jpg   # Placeholder images
```

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd AMRR-Assignment
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How to Use

### Step 1: Create a User Account

1. Upon first visit, you will be directed to the login page
2. Click on the "Sign up" link below the login form
3. Enter your details:
   - Name
   - Email address
   - Password (must meet security requirements)
4. Click "Sign Up" to create your account
5. Your user data will be stored in local storage

### Step 2: Login to Your Account

1. Enter your email and password on the login page
2. Click "Login"
3. Upon successful login, you will be redirected to the dashboard
4. Your authentication session will be stored in local storage

### Step 3: View and Manage Items

1. The dashboard displays all available items in a grid layout
2. Click on any item to view its details in a modal
3. Use the search/filter functionality to find specific items

### Step 4: Add a New Item

1. Click the "Add New Item" button in the navigation bar
2. Fill out the item form with:
   - Title
   - Description
   - Image URL(s)
   - Other relevant details
3. Click "Save" to add the item
4. The new item will be stored in local storage and displayed in the grid

### Step 5: Edit or Delete an Item

1. Click on an item to view its details
2. Click "Edit" to modify the item's information
3. Make your changes and click "Save"
4. To delete an item, click "Delete" and confirm the action in the confirmation dialog

## Code Architecture

### Authentication Flow

The application uses a context-based authentication system:

1. `auth-context.tsx` provides authentication state and methods
2. User credentials are stored in local storage
3. `auth-guard.tsx` protects routes that require authentication
4. Login and signup forms validate user inputs using Zod schema validation

### Item Management Flow

The item management functionality follows these patterns:

1. `items-context.tsx` provides item state and CRUD operations
2. Items are stored in local storage as a JSON array
3. The item grid component fetches and displays items from context
4. Item forms handle creation and editing with validation

## Component Overview

### Authentication Components

- `login-form.tsx`: Handles user login with validation
- `signup-form.tsx`: Manages user registration with validation
- `auth-guard.tsx`: Protects routes from unauthorized access

### Item Components

- `item-grid.tsx`: Displays items in a responsive grid
- `item-form.tsx`: Form for creating and editing items
- `item-modal.tsx`: Modal for displaying item details
- `image-carousel.tsx`: Carousel for displaying multiple item images

### UI Components

The project uses shadcn/ui components for consistent design:

- Button, Input, Select: Form elements
- Dialog, Sheet: Modal interfaces
- Toast: Notification system
- Card: Item container
- Tabs, Accordion: Content organization

## Data Storage

All data in this application is stored in the browser's local storage:

- **Users**: Stored as an array of user objects with hashed passwords
- **Current User**: The currently logged-in user's information
- **Items**: Stored as an array of item objects with unique IDs

Example local storage structure:

```javascript
// LocalStorage Keys
const KEYS = {
  USERS: 'amrr-users',
  CURRENT_USER: 'amrr-current-user',
  ITEMS: 'amrr-items'
};

// User Object Structure
{
  id: string,
  name: string,
  email: string,
  password: string // hashed password
}

// Item Object Structure
{
  id: string,
  title: string,
  description: string,
  images: string[],
  createdAt: number,
  updatedAt: number,
  createdBy: string // user ID
}
```

## UI Components

This project uses a combination of custom components and shadcn/ui components. The UI components are styled using Tailwind CSS classes and are designed to be responsive across all device sizes.

The theme support is implemented using `next-themes` which allows users to toggle between light and dark modes. The theme preference is stored in local storage to persist between visits.

---

This project demonstrates modern React development practices including context API usage, custom hooks, TypeScript type safety, and component composition.
