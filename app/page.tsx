import { useRouter } from "next/navigation";

export default function Home() {
    const { push } = useRouter();

    push("https://diab3dprinting.vercel.app/");
}
