import { Blog } from "../types/blog";
import { ObjectId, WithId } from "mongodb";
import { blogCollection } from "../../db/collections";
import { BlogQueryInput } from "../router/input/blog-query.input";

export const blogsRepository = {
    // Возвращаем все блоги
    async findMany(queryDto: BlogQueryInput): Promise<{ items: WithId<Blog>[]; totalCount: number}> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchBlogNameTerm,
        } = queryDto;

        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};

        if (searchBlogNameTerm) {
            filter.$or = [];
            filter.$or.push({ name: { $regex: searchBlogNameTerm, $options: 'i' } });
        }

        const items = await blogCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await blogCollection.countDocuments(filter);

        return { items, totalCount };
    },

    // Возвращаем конкретный блог по id
    async findById(id: string): Promise<WithId<Blog> | null> {
        return blogCollection.findOne({ _id: new ObjectId(id) });
    },

    async create(newBlog: Blog): Promise<WithId<Blog>> {
        const insertResult = await blogCollection.insertOne(newBlog);
        return { ...newBlog, _id: insertResult.insertedId };
    },

    async update(
        id: string,
        blog: Omit<Blog, 'createdAt' | 'isMembership'>
    ): Promise<boolean> {
        const updateResult = await blogCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: blog }
        );
        return updateResult.matchedCount > 0;
    },

    async delete(id: string): Promise<boolean> {
        const deleteResult = await blogCollection.deleteOne({ _id: new ObjectId(id) });
        return deleteResult.deletedCount > 0;
    },
};
