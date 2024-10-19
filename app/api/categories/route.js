import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const getCategories = async () => {
    const response = await fetch('https://fashiontipstricks.com/wp-json/wp/v2/categories?per_page=100');
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

export async function POST(req) {
    revalidateTag("categories");
    try {
        const { categoryId } = await req.json();
        await dbConnect();
        const Categories = await getCategories();
        const posts = await getPosts(parseInt(categoryId));
        for (const category of Categories) {
            
            // Check if the category already exists in the database
            const existingCategory = await Category.findOne({ categoryId: category.id });

            if (existingCategory) {
                if (parseInt(categoryId) === existingCategory.id) {
                    // Update the existing category
                    existingCategory.posts = posts;
                    await existingCategory.save();
                    console.log(`Category: ${existingCategory.name} Updated with ${posts.length} posts.`);
                }
            } else {
                const newposts = await getPosts(category.id);
                // Create a new category
                const newCategory = new Category({
                    categoryId: category.id,
                    name: category.name,
                    newposts,
                });
                await newCategory.save();
                console.log(`Saved category: ${newCategory.name} with ${newposts.length} posts.`);
            }
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