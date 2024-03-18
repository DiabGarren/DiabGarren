export interface Item {
  _id: any;
  name: string;
  colours: [{ name: string; value: string }];
  options: [
    {
      size: string;
      price: number;
      printing: { time: { hours: number; minutes: number }; weight: number };
    }
  ];
  bases: [string] | undefined;
  images: [string];
}
