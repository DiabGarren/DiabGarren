export default function DocPage(props: any) {
    const date = new Date(props.date);
    return (
        <div className="font-doc">
            <div className="text-center leading-[50px]">
                <h1 className="text-[22px] font-[400]">
                    THE ROODEPOORT STAKE
                    <br />
                    OF
                    <br />
                    THE CHURCH OF JESUS CHRIST OF LATTER-DAY SAINTS
                </h1>
                <h2 className="text-[20px] font-[500] my-[10px]">
                    Roodepoort Ward
                    <br />
                    {props.title} Meeting Agenda
                    <br />
                    {props.time}{" "}
                    {date.getDate() +
                        " " +
                        date.toLocaleString("default", {
                            month: "long",
                        }) +
                        " " +
                        date.getFullYear()}
                </h2>
            </div>
        </div>
    );
}
