"use client";

import React, { useState } from "react";
import Button from "../ui/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [userType, setUserType] = useState("client");
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      const { user } = response.data;

      if (user.role === "client") router.push("/client");
      else if (user.role === "owner") router.push("/owner");
      else if (user.role === "admin") router.push("/admin");
    } catch (error: any) {
      console.error("Login Error:", error);
      alert(
        "Login Failed: " +
          (error.response?.data?.message || "Invalid email or password"),
      );
    }
  };

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{
        background: `linear-gradient(180deg, rgba(139, 21, 56, 0.05) 0%, rgba(248, 247, 245, 0.95) 100%), url('/auth-bg.png') lightgray 50% / cover no-repeat`,
        backgroundColor: "#F8F7F5",
      }}
    >
      <div
        className="w-full max-w-[448px] bg-white/90 backdrop-blur-md flex flex-col items-center shadow-2xl"
        style={{
          borderRadius: "12px",
          padding: "48px 32px",
          border: "0.667px solid #E8E6E3",
        }}
      >
        <h1 className="font-cormorant text-[#8B1538] text-[32px] font-bold mb-1">
          Afrahi
        </h1>
        <h2 className="font-cormorant text-[#1A1A1A] text-[28px] font-bold text-center">
          Welcome Back
        </h2>
        <p className="font-montserrat text-[#4A4A4A] text-sm mb-8 text-center opacity-80">
          Sign in to your account
        </p>
        {/* Toggle User Type */}
        <div className="w-full flex p-1 bg-[#F4F3F1] rounded-lg mb-8">
          <button
            type="button"
            onClick={() => setUserType("client")}
            className={`flex-1 py-2 text-sm font-montserrat font-bold rounded-md transition-all ${
              userType === "client"
                ? "bg-[#8B1538] text-white shadow-md"
                : "text-[#4A4A4A]"
            }`}
          >
            Client
          </button>
          <button
            type="button"
            onClick={() => setUserType("owner")}
            className={`flex-1 py-2 text-sm font-montserrat font-bold rounded-md transition-all ${
              userType === "owner"
                ? "bg-[#8B1538] text-white shadow-md"
                : "text-[#4A4A4A]"
            }`}
          >
            Hall Owner
          </button>
        </div>
        <form className="w-full flex flex-col gap-5" onSubmit={handleLogin}>
          <div className="flex flex-col gap-1.5 text-left w-full">
            <label className="font-montserrat text-[11px] font-bold text-[#1A1A1A] uppercase tracking-[1px]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full p-3 rounded-lg border border-[#E8E6E3] focus:border-[#8B1538] outline-none font-montserrat text-sm bg-white/50 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5 text-left w-full">
            <div className="flex justify-between items-center">
              <label className="font-montserrat text-[11px] font-bold text-[#1A1A1A] uppercase tracking-[1px]">
                Password
              </label>
              <a
                href="#"
                className="text-[#8B1538] text-[10px] font-bold hover:underline"
              >
                Forgot?
              </a>
            </div>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full p-3 rounded-lg border border-[#E8E6E3] focus:border-[#8B1538] outline-none font-montserrat text-sm bg-white/50 transition-all"
            />
          </div>

          <Button
            type="submit"
            variant="secondary"
            className="w-full py-4 mt-3 font-bold text-base shadow-lg shadow-[#8B1538]/10"
          >
            Sign In
          </Button>
        </form>
        <p className="mt-8 text-center font-montserrat text-sm text-[#4A4A4A]">
          Don't have an account?
          <a
            href="/signup"
            className="text-[#8B1538] font-bold ml-2 hover:underline"
          >
            Sign Up
          </a>
        </p>
        <a
          href="/"
          className="mt-6 font-montserrat text-[11px] text-[#4A4A4A]
        hover:text-[#8B1538] transition-colors flex items-center gap-1
        opacity-70"
        >
          ← Back to Home
        </a>
      </div>
    </main>
  );
};

export default LoginForm;
