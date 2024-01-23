export interface Item {
    _id: any;
    name: string;
    colours: [string];
    options: [{ size: string; price: number; other: string }];
    bases: [string] | undefined;
    images: [string];
}
