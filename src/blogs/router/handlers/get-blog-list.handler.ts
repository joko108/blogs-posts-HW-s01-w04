import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsRepository } from "../../repositories/blogs.repository";
import { BlogQueryInput } from "../input/blog-query.input";
import { mapToBlogsListViewModelUtil } from "../mappers/map-to-blogs-list-view-model.util";

export const getBlogListHandler = async (
    req: Request<{}, {}, {}, BlogQueryInput>,
    res: Response
) => {
    try {
        const queryInput = req.query;

        const { items, totalCount } = await blogsRepository.findMany(queryInput);

        // Наружу отдаем view-model.
        const output = mapToBlogsListViewModelUtil(items, {
            pageNumber: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount,
        });

        res.status(HttpStatus.Ok_200).send(output);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
