export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-print-blue-light to-print-blue text-white p-[25px_20px] md:p-[30px_45px]">
            <h2 className="text-center">
                Custom 3D Printing by <a href="mailto:garrendiab@gmail.com">Garren Diab</a>
            </h2>
            <p className="mt-[15px]">Have a question? Want to order a custom print?</p>
            <p>
                Email me at <br className="md:hidden" />
                <a
                    href="mailto:garrendiab@gmail.com"
                    className="underline">
                    garrendiab@gmail.com
                </a>{" "}
                <br className="md:hidden" />
                or WhatsApp/Call me at <br className="md:hidden" />
                <a
                    href="rel:0609811694"
                    className="underline">
                    060 981 1694
                </a>
            </p>
            <p className="text-right mt-[25px] md:mt-[5px]">
                *All personal information is kept confidential.
            </p>
        </footer>
    );
}
