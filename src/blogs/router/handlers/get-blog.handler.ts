import { Request, Response } from "express";
import { blogsRepository } from "../../repositories/blogs.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model.utils";

export const getBlogHandler = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = req.params.id;
        const blog = await blogsRepository.findById(id);

        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(
                    createErrorMessages([{ message: 'Blog not found', field: 'id'}])
                );
            return;
        }

        const blogViewModel = mapToBlogViewModel(blog);
        res.status(HttpStatus.Ok_200).send(blogViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
