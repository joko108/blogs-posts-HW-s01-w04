import { Post } from "../types/post";
import { ObjectId, WithId } from "mongodb";
import { postCollection } from "../../db/collections";
import { PostsForBlogQueryInput } from "../router/input/posts-for-blog-query.input";

export const postsRepository = {
    // Возвращаем все блоги
    async findMany(queryDto: PostsForBlogQueryInput): Promise<{ items: WithId<Post>[]; totalCount: number }> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
        } = queryDto;

        const skip = (pageNumber - 1) * pageSize;

        const items = await postCollection
            .find()
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await postCollection.countDocuments();

        return { items, totalCount };
    },

    // Возвращаем конкретный блог по id
    async findPostById(id: string): Promise<WithId<Post> | null> {
        return postCollection.findOne({ _id: new ObjectId(id) });
    },

    // Создание блога, без поля id (id генерируется здесь)
    async createPost(newPost: Post): Promise<WithId<Post>> {
        const insertResult = await postCollection.insertOne(newPost);
        return { ...newPost, _id: insertResult.insertedId };
    },

    async updatePost(id: string, post: Omit<Post, 'createdAt' | 'blogName'>): Promise<boolean> {
        const updateResult = await postCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: post },
        );
        return updateResult.matchedCount > 0;
    },

    async deletePost(id: string): Promise<boolean> {
        const deleteResult = await postCollection.deleteOne({ _id: new ObjectId(id) });
        return deleteResult.deletedCount > 0;
    },

    async findManyByBlogId(
        blogId: string,
        queryDto: PostsForBlogQueryInput
    ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
        const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
        const skip = (pageNumber - 1) * pageSize;

        const filter = { blogId };

        const items = await postCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await postCollection.countDocuments(filter);

        return { items, totalCount };
    }
};
