"use client";

// This function initializes a dummy admin account for testing purposes
export function initDummyUsers() {
  // Check if users already exist in localStorage
  const existingUsers = localStorage.getItem("users");
  if (existingUsers) {
    const users = JSON.parse(existingUsers);
    // If there are already users, don't add more
    if (users.length > 0) return;
  }

  // Create just one admin dummy user
  const dummyUsers = [
    {
      id: "1",
      email: "admin@example.com",
      password: "Admin@123",
      name: "Admin User",
      createdAt: new Date().toISOString(),
      role: "admin",
    },
  ];

  // Store dummy users in localStorage
  localStorage.setItem("users", JSON.stringify(dummyUsers));
  console.log("Dummy users initialized");

  // Initialize dummy items
  initDummyItems();
}

// Function to initialize dummy items
export function initDummyItems() {
  // Check if items already exist
  const existingItems = localStorage.getItem("items");
  if (existingItems) {
    const items = JSON.parse(existingItems);
    // If there are already items, don't add more
    if (items.length > 0) return;
  }

  // Create one sample item for the admin user
  const dummyItems = [
    {
      id: "101",
      name: "Premium Sports T-Shirt",
      type: "Shirt",
      description:
        "High-quality moisture-wicking fabric perfect for intense workouts. Breathable material keeps you cool during any activity.",
      coverImage:
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80",
      additionalImages: [
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&auto=format&fit=crop&q=80",
      ],
      createdAt: new Date().toISOString(),
      userId: "1",
    },
  ];

  // Store dummy items
  localStorage.setItem("items", JSON.stringify(dummyItems));
  console.log("Dummy items initialized");
}
