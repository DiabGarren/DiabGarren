export interface bomEng {
    _id: any;
    lang: string;
    id: string;
    name: string;
    contents: [
        {
            chapter: number;
            verses: [{ verse: number; text: string }];
        }
    ];
}
