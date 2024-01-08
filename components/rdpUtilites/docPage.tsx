import Popup from "reactjs-popup";

export default function DocPage(props: any) {
    const currDate = new Date();
    const newDocs: any[] = [];
    const oldDocs: any[] = [];

    props.docs.map((doc: any) => {
        const date = new Date(doc.date);

        const dateStr =
            date.getDate() +
            " " +
            date.toLocaleString("default", { month: "long" }) +
            " " +
            date.getFullYear();

        if (
            (currDate.getDate() === date.getDate() &&
                currDate.getMonth() === date.getMonth() &&
                currDate.getFullYear() === date.getFullYear()) ||
            currDate < date
        ) {
            newDocs.push(
                <a
                    className={`button my-[10px] text-[1.2rem] text-left ${
                        currDate.getDate() === date.getDate() &&
                        currDate.getMonth() === date.getMonth() &&
                        currDate.getFullYear() === date.getFullYear()
                            ? "bg-green border-green hover:text-green"
                            : currDate < date
                            ? "bg-blue border-blue hover:text-blue"
                            : ""
                    }`}>
                    {dateStr}
                </a>
            );
        } else {
            oldDocs.push(
                <a
                    className={`button my-[10px] text-[1.2rem] text-left ${
                        currDate.getDate() === date.getDate() &&
                        currDate.getMonth() === date.getMonth() &&
                        currDate.getFullYear() === date.getFullYear()
                            ? "bg-green border-green hover:text-green"
                            : currDate > date
                            ? "bg-grey border-grey hover:text-grey"
                            : "bg-blue border-blue hover:text-blue"
                    }`}>
                    {dateStr}
                </a>
            );
        }
    });
    return (
        <div className="w-[350px]">
            {newDocs}{" "}
            <Popup
                trigger={
                    <button>
                        <svg
                            className={`inline w-[10px] h-[20px] ${props.past ? "rotate-90" : ""}`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="41"
                            height="52"
                            viewBox="0 0 41 52"
                            fill="none">
                            <path
                                d="M7.7735 1.18233L38.7596 21.8397C41.7283 23.8188 41.7283 28.1811 38.7596 30.1602L7.7735 50.8176C4.45073 53.0328 0 50.6509 0 46.6574L0 5.34258C0 1.34911 4.45073 -1.03285 7.7735 1.18233Z"
                                fill="black"
                            />
                        </svg>{" "}
                        Past Documents
                    </button>
                }
                position={"bottom left"}
                onOpen={() => props.setPast(true)}
                onClose={() => props.setPast(false)}
                closeOnDocumentClick={false}
                closeOnEscape={true}>
                <div className="w-[350px]">{oldDocs}</div>
            </Popup>
        </div>
    );
}
