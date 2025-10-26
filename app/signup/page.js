"use client";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
}
