"use client";
import Header from "@/components/3DPrinting/header";
import { useEffect, useState } from "react";

export default function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [prefer, setPrefer] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
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

    const signUp = async (event: any) => {
        event.preventDefault();
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                phone: phone,
                prefer: prefer,
                password: password,
                confirm: confirm,
            }),
        });
        const data = await res.json();

        if (data.status === "fail" || data.status === "error") setError(data.message);
        else window.location.href = "/3DPrinting";
    };

    return (
        <>
            <Header title="Sign Up" />
            <main className="w-[400px] mx-auto">
                <form
                    onSubmit={signUp}
                    className="mt-[50px] shadow-2xl rounded-lr p-[20px]">
                    <p className="text-print-red text-[1.1rem]">{error}</p>
                    <div className="mb-[15px]">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="form-input"
                            placeholder="First Name"
                            onChange={(event) => setFirstName(event.target.value)}
                            required
                        />
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className="form-input"
                            placeholder="Last Name"
                            onChange={(event) => setLastName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-[15px]">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-input"
                            placeholder="Username"
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="Email"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                        <label>Cell number</label>
                        <input
                            type="text"
                            name="phone"
                            className="form-input"
                            placeholder="(000) 123 4567"
                            onChange={(event) => setPhone(event.target.value)}
                        />
                        <div>
                            <label>Prefered contact method</label>
                            <div className="grid grid-cols-[3fr_4fr_2fr] bg-print-grey-light rounded p-[2px_5px]">
                                <div>
                                    <label>Text</label>
                                    <input
                                        type="radio"
                                        name="prefer"
                                        className="form-radio"
                                        onChange={() => setPrefer("Text")}
                                        id=""
                                    />
                                </div>
                                <div>
                                    <label>WhatsApp</label>
                                    <input
                                        type="radio"
                                        name="prefer"
                                        className="form-radio"
                                        onChange={() => setPrefer("WhatsApp")}
                                        id=""
                                    />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input
                                        type="radio"
                                        name="prefer"
                                        className="form-radio"
                                        onChange={() => setPrefer("Email")}
                                        id=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-input"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-input"
                        placeholder="Confirm Password"
                        onChange={(event) => setConfirm(event.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="form-button">
                        Sign Up
                    </button>
                    <p>
                        Already have an account?{" "}
                        <a
                            href="/3DPrinting/login"
                            className="text-print-blue-dark hover:underline cursor-pointer">
                            Login
                        </a>
                    </p>
                </form>
            </main>
        </>
    );
}
