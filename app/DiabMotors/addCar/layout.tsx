import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add Car",
    description: "Add a car",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
