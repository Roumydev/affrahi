"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useLang } from "@/context/LangContext";

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
  const { t } = useLang();
  const u = t.adminUsers;

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
    if (!confirm(u.deleteConfirm(name))) return;
    await axios.delete(`/api/admin/users/${id}`);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-neutral-500">{u.loading}</p>
      </div>
    );

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#8B1538]">{u.title}</h1>
        <span className="text-neutral-500">{u.users(users.length)}</span>
      </div>
      <input
        type="text"
        placeholder={u.searchPh}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B1538]/30 mb-6"
      />
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_2fr_auto] px-6 py-3 bg-stone-50 border-b border-stone-200 text-xs font-bold text-neutral-500 uppercase tracking-wider">
          <span>{u.name}</span>
          <span>{u.email}</span>
          <span>{u.role}</span>
          <span className="text-center pr-8">{u.reservations}</span>
          <span className="pl-2">{u.joined}</span>
          <span></span>
        </div>
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-neutral-400">{u.noUsers}</div>
        ) : (
          filtered.map((user, i) => (
            <div
              key={user.id}
              className={`grid grid-cols-[2fr_2fr_1fr_1fr_2fr_auto] px-6 py-4 items-center text-sm ${i !== filtered.length - 1 ? "border-b border-stone-100" : ""}`}
            >
              <span className="font-medium text-zinc-800 truncate pr-4">
                {user.name}
              </span>
              <span className="text-neutral-500 truncate pr-4">
                {user.email}
              </span>
              <span>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize ${roleBadge(user.role)}`}
                >
                  {user.role}
                </span>
              </span>
              <span className="text-center text-zinc-700">
                {user.role === "admin" ? (
                  <span className="text-neutral-300 text-xs">—</span>
                ) : (
                  <>
                    {user._count.reservations}
                    {user.role === "owner" && user._count.venues > 0 && (
                      <span className="text-xs text-neutral-400 ml-1">
                        ({user._count.venues} venues)
                      </span>
                    )}
                  </>
                )}
              </span>
              <span className="text-neutral-400 text-xs pl-8">
                {new Date(user.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span>
                {user.id !== currentId ? (
                  <button
                    onClick={() => handleDelete(user.id, user.name)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition"
                    title="Delete user"
                  >
                    <Trash2 size={16} />
                  </button>
                ) : (
                  <span className="text-xs text-neutral-300 px-2">{u.you}</span>
                )}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
