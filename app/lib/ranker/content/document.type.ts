export interface SearchDocument {
    id: string;
    content: string;
    link: string;
}

export interface RankedDocument extends SearchDocument {
    score: number;
}
