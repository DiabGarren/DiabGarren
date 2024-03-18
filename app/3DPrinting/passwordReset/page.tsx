"use client";

import PrintBody from "@/components/3DPrinting/body";
import { useState } from "react";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const resetPassword = async (event: any) => {
    event.preventDefault();

    setError("");
    setMessage("");

    await fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/passwordReset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "fail") setError(data.message);
        else setMessage(data.message);
      });
  };

  return (
    <PrintBody
      cart={null}
      user={null}
      mainClass={"my-[50px] mx-auto md:w-[400px]"}
    >
      <form onSubmit={resetPassword} className="shadow-2xl rounded-lr p-[20px]">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="form-input"
          placeholder="Email"
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <p className="text-print-red text-[1.1rem]">{error}</p>
        <p className="text-print-green text-[1.1rem]">{message}</p>
        <button type="submit" className="form-button">
          Reset Password
        </button>
      </form>
    </PrintBody>
  );
}
