export interface bomEsp {
    _id: any;
    lang: string;
    id: string;
    name: string;
    chapterName: string;
    contents: [
        {
            chapter: number;
            intro: string;
            verses: [{ verse: number; text: string }];
        }
    ];
}
