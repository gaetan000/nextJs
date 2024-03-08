import { createSupabaseClient } from "@/utils/supabase/server";
import Link from "next/link";
import { BlogPost } from "../type";



export default async function  Blog() {
    const supabase = createSupabaseClient();
    const blogPostsResponse = await supabase.from('BlogPost').select()
    const blogPosts = blogPostsResponse.data as BlogPost[];
    return (
        <main className="flex min-h-screen flex-col items-center justify-start space-y-6 ">
        <div>Blog</div>
        {blogPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
            <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.abstract}</p>
            </div>
            </Link>
        ))}
        </main>
    );
    }