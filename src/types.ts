export interface DataType {
    id: number,
    name: string,
    language: string,
    genres: Array<string>,
    status: string,
    rating: number,
    image?: string,
    summary: string,
}