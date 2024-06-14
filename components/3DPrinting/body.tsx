import Footer from "./footer";
import Header from "./header";

export default function PrintBody({
    children,
    user,
    cart = null,
    mainClass = "my-[50px] mx-auto w-[90%] md:w-[85%] xl:w-[900px]",
}: {
    children: React.ReactNode;
    user: any;
    cart: any;
    mainClass: any;
}) {
    return (
        <>
            <Header user={user ? user : null} cart={cart ? cart : null} />
            <main className={mainClass}>{children}</main>
            <Footer />
        </>
    );
}
