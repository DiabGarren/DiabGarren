import Footer from "./footer";
import Header from "./header";

export default function PrintBody({
    children,
    user,
    cart,
    mainClass,
}: {
    children: React.ReactNode;
    user: any;
    cart: any;
    mainClass: any;
}) {
    return (
        <>
            <Header
                user={user ? user : null}
                cart={cart ? cart : null}
            />
            <main className={mainClass}>{children}</main>
            <Footer />
        </>
    );
}
