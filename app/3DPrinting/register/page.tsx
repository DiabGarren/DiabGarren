"use client";
import Header from "@/components/3DPrinting/header";

export default function SignUp() {
    const signUp = async (event: any) => {
        event.preventDefautl();
    };
    return (
        <>
            <Header title="Sign Up" />
            <main className="w-[400px] mx-auto">
                <form
                    onSubmit={signUp}
                    className="mt-[50px] shadow-2xl rounded-lr p-[20px]">
                    <p className="text-print-red text-[1.1rem]"></p>
                    <div className="mb-[15px]">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="form-input"
                            placeholder="First Name"
                            required
                        />
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className="form-input"
                            placeholder="Last Name"
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
                            required
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="Email"
                            required
                        />
                        <label>Cell number</label>
                        <input
                            type="text"
                            name="phone"
                            className="form-input"
                            placeholder="(000) 123 4567"
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
                                        id=""
                                    />
                                </div>
                                <div>
                                    <label>WhatsApp</label>
                                    <input
                                        type="radio"
                                        name="prefer"
                                        className="form-radio"
                                        id=""
                                    />
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input
                                        type="radio"
                                        name="prefer"
                                        className="form-radio"
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
                        required
                    />
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-input"
                        placeholder="Confirm Password"
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
