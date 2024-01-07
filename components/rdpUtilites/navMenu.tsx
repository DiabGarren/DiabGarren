/* eslint-disable react/jsx-key */
export default function NavMenu(props: any) {
    const buttons = [];
    if (props.level) {
        if (props.level >= 2) {
            buttons.push("Ward Council");
            if (props.level >= 3) {
                buttons.push("Youth");
                if (props.level >= 4) {
                    buttons.push("Bishopric", "Sacrament");
                }
            }
        }
        buttons.sort();
    }

    buttons.splice(0, 0, "Dashboard");

    return (
        <div className="flex flex-col w-[250px] text-[1.2rem]">
            {buttons.map((button: string) => {
                return (
                    <a className="bg-blue hover:bg-blue-light text-white hover:text-blue p-[10px_25px] cursor-pointer first:rounded-[10px_10px_0_0] last:rounded-[0_0_10px_10px]">
                        {button}
                    </a>
                );
            })}
        </div>
    );
}
