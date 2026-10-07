import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { PostInputDto } from "../../dto/post.input.dto";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { Post } from "../../types/post";
import { postsRepository } from "../../repositories/posts.repository";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model.utils";

export const createPostForBlogHandler = async (
    req: Request<{ blogId: string }, {}, PostInputDto>,
    res: Response
) => {
    try {
        const blogId = req.params.blogId;

        const blog = await blogsRepository.findById(blogId);
        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessages([{ message: 'Blog not found', field: 'id' }]));
            return;
        }

        const newPost: Post = {
            ...req.body,
            blogId: blogId,  // Явно добавляем blogId.
            blogName: blog.name,
            createdAt: new Date(),
        };

        const createdPost = await postsRepository.createPost(newPost);
        const postViewModel = mapToPostViewModel(createdPost);
        res.status(HttpStatus.Created_201).send(postViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};