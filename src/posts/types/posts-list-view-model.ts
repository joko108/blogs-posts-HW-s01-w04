import { PostViewModel } from "./post-view-model";

export type PostsListViewModel = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: PostViewModel[];
};
