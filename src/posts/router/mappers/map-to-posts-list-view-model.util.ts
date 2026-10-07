import { WithId } from "mongodb";
import { Post } from "../../types/post";
import { PostsListViewModel } from "../../types/posts-list-view-model";
import { mapToPostViewModel } from "./map-to-post-view-model.utils";

export const mapToPostsListViewModelUtil = (
    items: WithId<Post>[],
    meta: { pageNumber: number; pageSize: number; totalCount: number }
): PostsListViewModel => {
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        // Здесь используем уже существующий маппер для одного поста,
        // чтобы не дублировать код преобразования полей
        items: items.map(mapToPostViewModel),
    };
};
