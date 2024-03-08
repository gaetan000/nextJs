"use server";

import { createSupabaseClient } from "@/utils/supabase/server";

export async function createComment(id: string, comment: string) {
  const supabase = createSupabaseClient();

  await supabase
    .from("BlogPostComment")
    .insert({ blogPostId: id, content: comment });
}
