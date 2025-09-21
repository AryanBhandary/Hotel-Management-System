import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ icons

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "var(--color-bg-light)" }}
    >
      <div
        className="w-full max-w-md shadow-lg rounded-2xl p-8"
        style={{
          backgroundColor: "var(--color-accent)",
          border: "1px solid var(--color-border)",
        }}
      >
        <h2
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "var(--color-primary)" }}
        >
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring"
            style={{
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-secondary-light)",
              color: "var(--color-text-light-bg)",
            }}
          />

          {/* Password with Eye Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring pr-12"
              style={{
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-secondary-light)",
                color: "var(--color-text-light-bg)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-lg"
              style={{ color: "var(--color-secondary)" }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg transition"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-accent)",
            }}
            onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--color-primary-hover)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-primary)")
            }
          >
            Log In
          </button>
        </form>

        <p
          className="text-center text-sm mt-4"
          style={{ color: "var(--color-secondary)" }}
        >
          Don’t have an account?{" "}
          <a href="/signup" style={{ color: "var(--color-primary)" }}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
