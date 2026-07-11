export interface SearchDocument {
    id: string;
    title: string;
    content: string;
    link: string;
    date: string;
    position: number;
}

export interface RankedDocument extends SearchDocument {
    score: number;
}