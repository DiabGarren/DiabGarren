"use client";
import Footer from "@/components/3DPrinting/footer";
import Header from "@/components/3DPrinting/header";

export default function Profile() {
    return (
        <>
            <Header />
            <main>
                <button
                    onClick={async () => {
                        await fetch(process.env.NEXT_PUBLIC_API_URL + "/3DPrinting/email");
                    }}>
                    Send email
                </button>
            </main>
            <Footer />
        </>
    );
}
