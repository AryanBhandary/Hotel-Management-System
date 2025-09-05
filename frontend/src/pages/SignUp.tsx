import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ icons

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
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
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring"
            style={{
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-secondary-light)",
              color: "var(--color-text-light-bg)",
            }}
          />

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

          {/* Password */}
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

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
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
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-lg"
              style={{ color: "var(--color-secondary)" }}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
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
            Sign Up
          </button>
        </form>

        <p
          className="text-center text-sm mt-4"
          style={{ color: "var(--color-secondary)" }}
        >
          Already have an account?{" "}
          <a href="/login" style={{ color: "var(--color-primary)" }}>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
