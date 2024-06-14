export interface Item {
    _id: any;
    name: string;
    colours: [{ name: string; value: string } | undefined];
    options:
        | [
              | {
                    size: string;
                    price: number;
                    printing: {
                        time: { hours: number; minutes: number };
                        weight: number;
                    };
                }
              | undefined
          ];
    bases: [string] | undefined;
    images: [string];
}
