"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  _count: { reservations: number; venues: number };
};

const roleBadge = (role: string) => {
  if (role === "admin") return "bg-purple-100 text-purple-700";
  if (role === "owner") return "bg-blue-100 text-blue-700";
  return "bg-stone-100 text-stone-600";
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([axios.get("/api/admin/users"), axios.get("/api/auth/me")])
      .then(([usersRes, meRes]) => {
        setUsers(usersRes.data.users);
        setCurrentId(meRes.data.user?.id);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    await axios.delete(`/api/admin/users/${id}`);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-neutral-500">Loading...</p>
      </div>
    );

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#8B1538]">All Users</h1>
        <span className="text-neutral-500">
          {users.length} user{users.length !== 1 ? "s" : ""}
        </span>
      </div>

      <input
        type="text"
        placeholder="Search by name, email or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1538]/30 mb-6"
      />

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_2fr_auto] px-6 py-3 bg-stone-50 border-b border-stone-200 text-xs font-bold text-neutral-500 uppercase tracking-wider">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span className="text-center pr-8">Reservations</span>
          <span className="pl-2">Joined</span>
          <span></span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-12 text-center text-neutral-400">
            No users found
          </div>
        ) : (
          filtered.map((u, i) => (
            <div
              key={u.id}
              className={`grid grid-cols-[2fr_2fr_1fr_1fr_2fr_auto] px-6 py-4 items-center text-sm ${
                i !== filtered.length - 1 ? "border-b border-stone-100" : ""
              }`}
            >
              <span className="font-medium text-zinc-800 truncate pr-4">
                {u.name}
              </span>
              <span className="text-neutral-500 truncate pr-4">{u.email}</span>
              <span>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize ${roleBadge(u.role)}`}
                >
                  {u.role}
                </span>
              </span>
              <span className="text-center text-zinc-700">
                {u.role === "admin" ? (
                  <span className="text-neutral-300 text-xs">—</span>
                ) : (
                  <>
                    {u._count.reservations}
                    {u.role === "owner" && u._count.venues > 0 && (
                      <span className="text-xs text-neutral-400 ml-1">
                        ({u._count.venues} venues)
                      </span>
                    )}
                  </>
                )}
              </span>
              <span className="text-neutral-400 text-xs pl-8">
                {new Date(u.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span>
                {u.id !== currentId ? (
                  <button
                    onClick={() => handleDelete(u.id, u.name)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition"
                    title="Delete user"
                  >
                    <Trash2 size={16} />
                  </button>
                ) : (
                  <span className="text-xs text-neutral-300 px-2">you</span>
                )}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
