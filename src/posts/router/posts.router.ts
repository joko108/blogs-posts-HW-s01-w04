import { RequestHandler, Router } from "express";
import { POSTS_ROUTES } from "../constants/posts.paths";
import { getPostListHandler } from "./handler/get-post-list.handler";
import { getPostHandler } from "./handler/get-post.handler";
import { createPostHandler } from "./handler/create-post.handler";
import { updatePostHandler } from "./handler/update-post.handler";
import { deletePostHandler } from "./handler/delete-post.handler";
import { idValidation } from "../../core/middlewares/validation/params-id.validation.middleware";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { superAdminGuardMiddleware } from "../../auth/middlewares/super-admin.guard.middleware";
import { postInputDtoValidation } from "../validation/post.input-dto.validation-middlewares";
import {
    paginationAndSortingValidation
} from "../../core/middlewares/validation/query-pagination-sorting.validation.middleware";
import { sanitizeQueryParams } from "../../core/middlewares/validation/sanitize-query.middleware";
import { PostSortField } from "./input/post-sort-field";

export const postsRouter = Router({});

// Роутер, направляющие реквест по необходимым мидлварам и хендлерам
// Также, для POST, PUT и DELETE добавлена авторизация
postsRouter
    .get(
        POSTS_ROUTES.ROOT,
        paginationAndSortingValidation(PostSortField),
        // inputValidationResultMiddleware,
        sanitizeQueryParams,
        getPostListHandler as unknown as RequestHandler
    )

    .get(
        POSTS_ROUTES.BY_ID,
        idValidation,
        inputValidationResultMiddleware,
        getPostHandler,
    )

    .post(
        POSTS_ROUTES.ROOT,
        superAdminGuardMiddleware,
        postInputDtoValidation,
        inputValidationResultMiddleware,
        createPostHandler
    )

    .put(
        POSTS_ROUTES.BY_ID,
        superAdminGuardMiddleware,
        idValidation,
        postInputDtoValidation,
        inputValidationResultMiddleware,
        updatePostHandler)

    .delete(
        POSTS_ROUTES.BY_ID,
        superAdminGuardMiddleware,
        idValidation,
        inputValidationResultMiddleware,
        deletePostHandler
    );
