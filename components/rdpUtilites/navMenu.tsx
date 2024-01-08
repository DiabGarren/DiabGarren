/* eslint-disable react/jsx-key */
export default function NavMenu(props: any) {
    const buttons = [];
    if (props.level) {
        if (props.level >= 2) {
            buttons.push({ name: "Ward Council", value: "wardCouncil" });
            if (props.level >= 3) {
                buttons.push({ name: "Youth", value: "youth" });
                if (props.level >= 4) {
                    buttons.push(
                        { name: "Bishopric", value: "bishopric" },
                        { name: "Sacrament", value: "sacrament" }
                    );
                }
            }
        }
        buttons.sort((a, b) => a.name.localeCompare(b.name));
    }

    buttons.splice(0, 0, { name: "Dashboard", value: "dashboard" });

    return (
        <div className="flex flex-col w-[250px] text-[1.2rem]">
            {buttons.map((button: any) => {
                if (button.name === props.active) {
                    return (
                        <button className="bg-blue-light text-blue text-left p-[10px_25px] cursor-pointer first:rounded-[10px_10px_0_0] last:rounded-[0_0_10px_10px]">
                            {button.name}
                        </button>
                    );
                } else {
                    return (
                        <a
                            href={`/rdpUtilities/${button.value}`}
                            className="bg-blue hover:bg-blue-light text-white hover:text-blue p-[10px_25px] cursor-pointer first:rounded-[10px_10px_0_0] last:rounded-[0_0_10px_10px]">
                            {button.name}
                        </a>
                    );
                }
            })}
        </div>
    );
}
