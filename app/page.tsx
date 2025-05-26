export default function Home() {
    return (
        <main className="w-[350px] mx-auto">
            <a
                className="text-white bg-blue border-[2px] border-blue block my-[10px] py-[5px] rounded text-center hover:bg-white hover:text-blue"
                href="/3DPrinting"
            >
                3D Printing
            </a>
            <a
                className="text-white bg-blue border-[2px] border-blue block my-[10px] py-[5px] rounded text-center hover:bg-white hover:text-blue"
                href="/DiabMotors"
            >
                Diab Motors
            </a>
        </main>
    );
}
