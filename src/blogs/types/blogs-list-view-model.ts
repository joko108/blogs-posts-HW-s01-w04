// view-model для отправки по API.
export type BlogsListViewModel = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: {
        id: string;
        name: string;
        description: string;
        websiteUrl: string;
        createdAt: Date;
        isMembership: boolean;
    }[],
};
