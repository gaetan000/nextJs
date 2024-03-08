import { BlogPost } from "@/app/type";
import { createSupabaseClient } from "@/utils/supabase/server";
import { useState } from "react";
import { createComment } from "./createComment.action";
import { CommentForm } from "./CommentForm";

// export const dynamicParams = false;
// export const dynamic = "force-static";

export async function generateStaticParams() {
  // const posts = await fetch('https://.../posts').then((res) => res.json())

  // return posts.map((post) => ({
  //   slug: post.slug,
  // }))

  const supabase = createSupabaseClient();
  const blogPostsResponse = await supabase.from("BlogPost").select();
  const blogPosts = blogPostsResponse.data as BlogPost[];
  console.log(`blogpost number: ${blogPosts.length}`);

  return blogPosts.map((post) => ({
    id: `${post.id}`,
  }));
}

export default async function BlogId({ params }: { params: { id: string } }) {
  const { id } = params;
  
  //   if (!id) {
  //     throw new Error("Blog post not found");
  //   }
  const supabase = createSupabaseClient();
  const blogPostsResponse = await supabase
    .from("BlogPost")
    .select("*")
    .eq("id", id)
    .single();
  const blogPost = blogPostsResponse.data as BlogPost;

  const { data: blogPostComments } = await supabase
    .from("BlogPostComment")
    .select()
    .eq("blogPostId", params.id)
    .order("created_at", { ascending: false });

    console.log("blogPostComments number", blogPostComments?.length ?? "aucun commentaire");
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1>Blog n° {blogPost.id}</h1>
      <h2>{blogPost.title}</h2>
      <p>{blogPost.body}</p>
      <h2>Comments</h2>
      <div>
        {blogPostComments && blogPostComments.map((comment) => (
          <li key={comment.blogPostId}>
            <p>{comment.content}</p>
          </li>
        ))}
      </div>
      <div>Add a comment</div>
      <CommentForm id={id} />
    </main>
  );
}
