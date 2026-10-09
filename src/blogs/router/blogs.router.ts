import { RequestHandler, Router } from "express";
import { BLOGS_ROUTES } from "../constants/blogs.paths";
import { getBlogListHandler } from "./handlers/get-blog-list.handler";
import { getBlogHandler } from "./handlers/get-blog.handler";
import { createBlogHandler } from "./handlers/create-blog.handler";
import { updateBlogHandler } from "./handlers/update-blog.handler";
import { deleteBlogHandler } from "./handlers/delete-blog.handler";
import { blogIdParamValidation, idValidation } from "../../core/middlewares/validation/params-id.validation.middleware";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { superAdminGuardMiddleware } from "../../auth/middlewares/super-admin.guard.middleware";
import { blogInputDtoValidation } from "../validation/blog.input-dto.validation-middlewares";
import { paginationAndSortingValidation } from "../../core/middlewares/validation/query-pagination-sorting.validation.middleware";
import { sanitizeQueryParams } from "../../core/middlewares/validation/sanitize-query.middleware";
import { BlogSortField } from "./input/blog-sort-field";
import { PostSortField } from "../../posts/router/input/post-sort-field";
import { getPostsByBlogIdHandler } from "./handlers/get-posts-by-blog-id.handler";
import { postInputDtoWithoutBlogIdValidation } from "../../posts/validation/post.input-dto.validation-middlewares";
import { createPostForBlogHandler } from "../../posts/router/handler/create-post-for-blog.handler";

export const blogsRouter = Router({});

// Роутер, направляющие реквест по необходимым мидлварам и хендлерам
// Также, для POST, PUT и DELETE добавлена авторизация
blogsRouter
    .get(
        BLOGS_ROUTES.ROOT,
        paginationAndSortingValidation(BlogSortField),
        inputValidationResultMiddleware,
        sanitizeQueryParams,
        getBlogListHandler as unknown as RequestHandler)

    .get(
        BLOGS_ROUTES.BY_ID,
        idValidation,
        inputValidationResultMiddleware,
        getBlogHandler
    )

    .post(
        BLOGS_ROUTES.ROOT,
        superAdminGuardMiddleware,
        blogInputDtoValidation,
        inputValidationResultMiddleware,
        createBlogHandler
    )

    .put(
        BLOGS_ROUTES.BY_ID,
        superAdminGuardMiddleware,
        idValidation,
        blogInputDtoValidation,
        inputValidationResultMiddleware,
        updateBlogHandler
    )

    .delete(
        BLOGS_ROUTES.BY_ID,
        superAdminGuardMiddleware,
        idValidation,
        deleteBlogHandler
    )

    .get(
        BLOGS_ROUTES.BY_ID_FOR_POSTS,
        blogIdParamValidation,
        paginationAndSortingValidation(PostSortField),
        inputValidationResultMiddleware,
        sanitizeQueryParams,
        getPostsByBlogIdHandler as unknown as RequestHandler
    )

    .post(
        BLOGS_ROUTES.BY_ID_FOR_POSTS,
        superAdminGuardMiddleware,
        blogIdParamValidation,
        postInputDtoWithoutBlogIdValidation,
        inputValidationResultMiddleware,
        createPostForBlogHandler
    );
