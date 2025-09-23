// src/services/authService.ts

// Save a new user (signup)
export const registerUser = (name: string, email: string, password: string) => {
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
  
    // Check if email already exists
    const userExists = existingUsers.some((user: any) => user.email === email);
    if (userExists) {
      throw new Error("User already exists!");
    }
  
    const newUser = { name, email, password };
    existingUsers.push(newUser);
  
    localStorage.setItem("users", JSON.stringify(existingUsers));
    return newUser;
  };
  
  // Login user (used in Login.tsx)
  export const loginUser = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );
    if (!user) throw new Error("Invalid email or password");
  
    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  };
  
  // Get current logged-in user
  export const getCurrentUser = () => {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  };
  
  // Logout
  export const logoutUser = () => {
    localStorage.removeItem("currentUser");
  };
  