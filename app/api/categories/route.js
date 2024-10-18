import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const getCategories = async () => {
    const response = await fetch('https://fashiontipstricks.com/wp-json/wp/v2/categories');
    const res = await response.json();
    let array = res.map(category => ({
        id: category.id,
        name: category.name
    }));
    return array;
}

const getPosts = async (categoryId) => {
    const response = await fetch(`https://fashiontipstricks.com/wp-json/wp/v2/posts?categories=${categoryId}&per_page=100`);
    const data = await response.json();
    let fetchedPosts = data.map(post => ({
        title: post.title.rendered,
        link: post.link
    }));
    return fetchedPosts;
}

export async function POST() {
    revalidateTag("categories");
    try {
        await dbConnect();
        const Categories = await getCategories();
        for (const category of Categories) {
            const posts = await getPosts(category.id);

            // Check if the category already exists in the database
            const existingCategory = await Category.findOne({ categoryId: category.id });

            if (existingCategory) {
                // Update the existing category
                existingCategory.posts = posts;
                await existingCategory.save();
            } else {
                // Create a new category
                const newCategory = new Category({
                    categoryId: category.id,
                    name: category.name,
                    posts,
                });
                await newCategory.save();
            }
            console.log(`Saved category: ${category.name} with ${posts.length} posts.`);
        }
        return NextResponse.json({ message: `All Categories are Updated in Data Base` });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }

}

// GET API to fetch categories and posts
export async function GET() {
    revalidateTag("categories");
    try {
        await dbConnect();
        const categories = await Category.find(); // Fetch all categories with their posts

        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}