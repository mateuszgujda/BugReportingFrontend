

export type PagedResult<T> = {
    currentPage: number;
    totalPages: number;
    totalResults: number,
    resultsPerPage: number;
    items: Array<T>
}

export interface PagedRequest {
    page: number;
    results: number;
    orderBy: string;
    sortOrder: "asc" | "desc"
}