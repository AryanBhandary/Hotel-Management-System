import { useEffect, useState } from "react";
import { getCurrentUser, updateCurrentUser } from "../../services/authUser";

export default function Profile() {
  const [form, setForm] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const me = await getCurrentUser();
        setForm({
          username: me?.username || "",
          email: me?.email || "",
        });
      } catch (err: any) {
        setError(err?.message || "Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);
    try {
      await updateCurrentUser(form);
      setSuccess("Profile updated successfully.");
    } catch (err: any) {
      setError(err?.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 mt-[10%]">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl font-bold mb-2 text-[var(--color-primary)]">Your Profile</h1>
        <p className="text-[var(--color-secondary)] mb-4">Update your account information.</p>

        {error && <div className="text-red-600 mb-3 text-sm">{error}</div>}
        {success && <div className="text-green-600 mb-3 text-sm">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-[var(--color-secondary-light)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-secondary)] mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-[var(--color-secondary-light)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="sub-btn w-full disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

