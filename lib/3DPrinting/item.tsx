export interface Item {
  _id: any;
  name: string;
  colours: [{ name: string; value: string }];
  options: [{ size: string; price: number; other: string }];
  bases: [string] | undefined;
  images: [string];
}
