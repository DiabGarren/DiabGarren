"use client";
import PrintBody from "@/components/3DPrinting/body";
import Header from "@/components/3DPrinting/header";
import { useEffect, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/user")
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            window.location.href = "/3DPrinting/";
          }
        });
    };
    getUser();
  }, []);

  const login = async (event: any) => {
    event.preventDefault();

    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      }
    );

    const data = await res.json();

    if (data.status === "error") setError(data.message);
    else window.location.href = "/3DPrinting";
  };

  return (
    <PrintBody
      user={null}
      cart={null}
      mainClass={"my-[50px] mx-auto md:w-[400px]"}
    >
      <form onSubmit={login} className="shadow-2xl rounded-lr p-[20px]">
        <p className="text-print-red text-[1.1rem]">{error}</p>
        <label>Username/Email</label>
        <input
          type="text"
          name="usernameEmail"
          className="form-input"
          placeholder="Username/Email"
          onChange={(event) => {
            setUsername(event.target.value.toLowerCase());
            setEmail(event.target.value.toLowerCase());
          }}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-input"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <a
          href="/3DPrinting/passwordReset"
          className="block text-print-blue-dark hover:underline cursor-pointer"
        >
          Forgot password?
        </a>
        <button type="submit" className="form-button">
          Login
        </button>
        <p>
          Don&apos;t have an account?{" "}
          <a
            href="/3DPrinting/register"
            className="text-print-blue-dark hover:underline cursor-pointer"
          >
            Sign Up
          </a>
        </p>
      </form>
    </PrintBody>
  );
}
