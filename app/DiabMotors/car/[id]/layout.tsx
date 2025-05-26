export async function generateMetadata({ params }: { params: { id: string } }) {
    const id = params.id;
    const car = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/DiabMotors/car/" + id
    ).then((res) => res.json());
    return {
        title: `${car.data.make} ${car.data.model}`,
        description: `Car page for ${car.data.make} ${car.data.model}, ${car.data.year}`,
    };
}

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
