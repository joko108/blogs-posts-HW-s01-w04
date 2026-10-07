import { WithId } from "mongodb";
import { Blog } from "../../types/blog";
import { BlogsListViewModel } from "../../types/blogs-list-view-model";

export const mapToBlogsListViewModelUtil = (
    items: WithId<Blog>[],
    meta: { pageNumber: number, pageSize: number, totalCount: number }
): BlogsListViewModel => {
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        items: items.map((item) => ({
            id: item._id.toString(),
            name: item.name,
            description: item.description,
            websiteUrl: item.websiteUrl,
            createdAt: item.createdAt,
            isMembership: item.isMembership,
        })),
    };
};
