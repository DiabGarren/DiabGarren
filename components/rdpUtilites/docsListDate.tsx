/* eslint-disable react/jsx-key */
export default function DocsListDate(props: any) {
    const currDate = new Date();
    const newDocs: any[] = [];
    const months: any[] = [];

    props.docs.map((doc: any) => {
        const date = new Date(doc.date);

        const dateStr =
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear();

        if (props.year) {
            if (date.getFullYear() === props.year) {
                let exists = false;
                months.forEach((month: Date) => {
                    if (month.getMonth() === date.getMonth()) exists = true;
                });
                if (!exists) months.push(date);
            }
        }
    });

    return (
        <div className="w-[350px]">
            <a
                href="/rdpUtilities/dashboard"
                className="flex items-center gap-[5px]"
            >
                {" "}
                <svg
                    className={`inline w-[10px] h-[20px] rotate-180`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="41"
                    height="52"
                    viewBox="0 0 41 52"
                    fill="none"
                >
                    <path
                        d="M7.7735 1.18233L38.7596 21.8397C41.7283 23.8188 41.7283 28.1811 38.7596 30.1602L7.7735 50.8176C4.45073 53.0328 0 50.6509 0 46.6574L0 5.34258C0 1.34911 4.45073 -1.03285 7.7735 1.18233Z"
                        fill="black"
                    />
                </svg>
                Back
            </a>
            <a className="rdp-button rdp-button-blue">Create Document</a>
            {months
                .sort((a, b) => (a.getMonth() > b.getMonth() ? 1 : -1))
                .map((month: Date) => {
                    return (
                        <a className={`rdp-button rdp-button-grey`}>
                            {month.toLocaleString("default", { month: "long" })}
                        </a>
                    );
                })}
        </div>
    );
}
