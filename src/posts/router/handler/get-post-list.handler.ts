import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsRepository } from "../../repositories/posts.repository";
import {PostsForBlogQueryInput} from "../input/posts-for-blog-query.input";
import {mapToPostsListViewModelUtil} from "../mappers/map-to-posts-list-view-model.util";

export const getPostListHandler = async (
    req: Request<{}, {}, {}, PostsForBlogQueryInput>,
    res: Response
) => {
    try {
        const queryInput = req.query;

        const { items, totalCount } = await postsRepository.findMany(queryInput);

        // Наружу отдаем view-model
        const output = mapToPostsListViewModelUtil(items, {
            pageNumber: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount,
        });
        res.status(HttpStatus.Ok_200).send(output);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
