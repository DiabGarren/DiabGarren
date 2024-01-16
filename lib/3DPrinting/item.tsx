export interface Item {
    _id: any;
    name: string;
    colours: [string];
    options: [{ size: string; price: number }];
    images: [string];
}
