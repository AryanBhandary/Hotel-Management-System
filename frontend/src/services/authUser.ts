type AuthenticatedUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  user: AuthenticatedUser;
  access: string;
  refresh: string;
};

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const AUTH_EVENT = "hotel-auth-change";

const buildHeaders = (headers?: HeadersInit) => ({
  "Content-Type": "application/json",
  ...(headers || {}),
});

const handleResponse = async (response: Response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.detail || data.message || "Something went wrong, please try again.");
  }
  return data;
};

const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: buildHeaders(options.headers),
  });
  return handleResponse(response);
};

const persistSession = (payload: AuthResponse) => {
  localStorage.setItem("token", payload.access);
  localStorage.setItem("refreshToken", payload.refresh);
  localStorage.setItem("user", JSON.stringify(payload.user));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_EVENT));
  }
};

export const registerUser = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const payload: AuthResponse = await apiFetch("/accounts/register/", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  persistSession(payload);
  return payload;
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const payload: AuthResponse = await apiFetch("/accounts/token/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  persistSession(payload);
  return payload;
};

export const getCurrentUser = async (): Promise<AuthenticatedUser | null> => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const response = await apiFetch("/accounts/me/", {
    headers: buildHeaders({
      Authorization: `Bearer ${token}`,
    }),
  });

  return response.user ?? null;
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  const response = await apiFetch("/accounts/token/refresh/", {
    method: "POST",
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (response?.access) {
    localStorage.setItem("token", response.access);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(AUTH_EVENT));
    }
    return response.access as string;
  }

  return null;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_EVENT));
  }
};

export const AUTH_CHANGE_EVENT = AUTH_EVENT;

