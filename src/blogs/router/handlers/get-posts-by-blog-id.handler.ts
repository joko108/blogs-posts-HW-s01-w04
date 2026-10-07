import { Request, Response } from "express";
import { blogsRepository } from "../../repositories/blogs.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { PostsForBlogQueryInput } from "../../../posts/router/input/posts-for-blog-query.input";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { mapToPostsListViewModelUtil } from "../../../posts/router/mappers/map-to-posts-list-view-model.util";
import { postsRepository } from "../../../posts/repositories/posts.repository";

export const getPostsByBlogIdHandler = async (
    req: Request<{ blogId: string }, {}, {}, PostsForBlogQueryInput>,
    res: Response
) => {
    try {
        const blogId = req.params.blogId;
        const queryInput = req.query;

        // Проверяем, существует ли блог.
        const blog = await blogsRepository.findById(blogId);
        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessages([{ message: 'Blog not found', field: 'id' }]));
            return;
        }

        const { items, totalCount } = await postsRepository.findManyByBlogId(blogId, queryInput);

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
