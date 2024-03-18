"use client";

import PrintBody from "@/components/3DPrinting/body";
import { User } from "@/lib/3DPrinting/user";
import { useEffect, useState } from "react";

export default function ResetPassword({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User>();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "/3DPrinting/passwordReset/" +
          params.id
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "fail") window.location.href = "/3DPrinting";
          else setUser(data.data);
        });
    };
    getUser();
  }, [params.id]);

  const resetPassword = async (event: any) => {
    event.preventDefault();
    await fetch(
      process.env.NEXT_PUBLIC_API_URL +
        "/3DPrinting/passwordReset/" +
        params.id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: password,
          confirm: confirm,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "fail") setError(data.message);
        else {
          setMessage(data.message);
          window.location.href = "/3DPrinting/login";
        }
      });
  };

  return (
    <PrintBody
      cart={null}
      user={null}
      mainClass={"my-[50px] mx-auto md:w-[400px]"}
    >
      <form onSubmit={resetPassword} className="shadow-2xl rounded-lr p-[20px]">
        <h2>
          {user?.firstName} {user?.lastName}
        </h2>
        <label htmlFor="password">New password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-input"
          placeholder="Password"
          required
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="confirm-password">Confirm password</label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          className="form-input"
          placeholder="Password"
          required
          onChange={(event) => setConfirm(event.target.value)}
        />
        <p className="text-print-red text-[1.1rem]">{error}</p>
        <p className="text-print-green text-[1.1rem]">{message}</p>
        <button className="form-button">Reset password</button>
      </form>
    </PrintBody>
  );
}
