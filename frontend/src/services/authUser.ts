// src/services/authService.ts

export const registerUser = (name: string, email: string, password: string) => {
  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

  // Check if email already exists
  const userExists = existingUsers.some((user: any) => user.email === email);
  if (userExists) throw new Error("User already exists!");

  const newUser = { name, email, password };
  existingUsers.push(newUser);

  localStorage.setItem("users", JSON.stringify(existingUsers));

  // Create token
  const token = "token_" + Date.now();
  localStorage.setItem("currentUser", JSON.stringify({ ...newUser, token }));

  return { user: newUser, token };
};

export const loginUser = (email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u: any) => u.email === email && u.password === password);

  if (!user) return null;

  const token = "token_" + Date.now();
  localStorage.setItem("currentUser", JSON.stringify({ ...user, token }));

  return { user, token };
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
};
