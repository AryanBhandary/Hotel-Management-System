import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../../services/authUser";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/allRooms");
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData.email, formData.password);
      if (response) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        alert("Logged in successfully!");
        navigate("/allRooms");
      } else {
        alert("Invalid email or password!");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-bg-light)] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl shadow-lg rounded-2xl p-6 sm:p-10 bg-[var(--color-accent)] border border-[var(--color-border)]">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[var(--color-primary)]">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            className="text-field"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              className="pass-field"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-lg text-[var(--color-secondary)]"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button type="submit" className="sub-btn">
            Log In
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-[var(--color-secondary)]">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[var(--color-primary)] font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
