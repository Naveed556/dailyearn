import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const getPosts = async (categoryId) => {
    const response = await fetch(`https://fashiontipstricks.com/wp-json/wp/v2/posts?categories=${categoryId}&per_page=100`);
    const data = await response.json();
    let fetchedPosts = data.map(post => ({
        title: post.title.rendered,
        link: post.link
    }));
    return fetchedPosts;
}

export async function POST(req) {
    revalidateTag("categories");
    try {
        const { categoryId } = await req.json();
        await dbConnect();
        const posts = await getPosts(categoryId);
        // Check if the category already exists in the database
        const selectedCategory = await Category.findOne({ categoryId: categoryId });
        selectedCategory.posts = posts;
        await selectedCategory.save();
        return NextResponse.json({ message: `All links are Updated for ${categoryId}` });
    } catch (error) {
        return NextResponse.json({ message: `Error while Updating Links: ${error.message}` });
    }
}