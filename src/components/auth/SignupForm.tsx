"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";

const SignupForm = () => {
  const [userType, setUserType] = useState("client");
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLang();
  const a = t.auth.signup;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/auth/register", { ...form, role: userType });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create account");
    }
    setLoading(false);
  };

  const fields = [
    { label: a.fullName, key: "name", type: "text", ph: a.fullNamePh },
    { label: a.email, key: "email", type: "email", ph: a.emailPh },
    { label: a.password, key: "password", type: "password", ph: a.passwordPh },
  ];

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6"
      style={{
        background: `linear-gradient(180deg,rgba(139,21,56,0.06) 0%,rgba(248,247,245,0.95) 100%),url('/auth-bg.png') center/cover no-repeat`,
      }}
    >
      <div
        className="w-full max-w-[440px] bg-white/92 backdrop-blur-md rounded-2xl border border-neutral-300 p-8 sm:p-12"
        style={{ boxShadow: "0 8px 32px rgba(43,43,43,0.14)" }}
      >
        <div className="text-center mb-8">
          <h1 className="font-heading text-burgundy-700 text-[30px] font-bold mb-1">
            Afrahi
          </h1>
          <h2 className="font-heading text-neutral-900 text-[26px] font-bold">
            {a.title}
          </h2>
          <p className="font-body text-neutral-600 text-[13px] mt-1">
            {a.subtitle}
          </p>
        </div>

        <div className="w-full flex p-1 bg-neutral-200 rounded-lg mb-7">
          {["client", "owner"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setUserType(type)}
              className={`flex-1 py-2 text-[13px] font-body font-bold rounded-md transition-all ${userType === type ? "bg-burgundy-700 text-white shadow" : "text-neutral-600 hover:text-neutral-900"}`}
            >
              {type === "owner" ? a.owner : a.client}
            </button>
          ))}
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          {error && (
            <div className="p-3 bg-error-50 border border-error-100 rounded-lg font-body text-error-700 text-[13px]">
              {error}
            </div>
          )}
          {fields.map((f) => (
            <div key={f.key}>
              <label className="font-body text-[11px] font-bold text-neutral-900 uppercase tracking-[1px] block mb-1.5">
                {f.label}
              </label>
              <input
                type={f.type}
                required
                placeholder={f.ph}
                value={(form as any)[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full p-3 rounded-lg border border-neutral-300 focus:border-burgundy-700 outline-none font-body text-[13px] text-neutral-900 bg-white transition-colors"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-burgundy-700 text-white font-body font-bold rounded-lg hover:bg-burgundy-800 transition-colors disabled:opacity-50 mt-1 text-[14px]"
          >
            {loading ? a.creating : a.create}
          </button>
        </form>

        <p className="mt-7 text-center font-body text-[13px] text-neutral-600">
          {a.hasAccount}{" "}
          <a
            href="/login"
            className="text-burgundy-700 font-bold hover:underline"
          >
            {a.signIn}
          </a>
        </p>
        <a
          href="/"
          className="block text-center mt-4 font-body text-[11px] text-neutral-500 hover:text-burgundy-700 transition-colors"
        >
          {a.backHome}
        </a>
      </div>
    </main>
  );
};

export default SignupForm;
