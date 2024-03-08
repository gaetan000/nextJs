"use client"
import { useState } from "react";
import { createComment } from "./createComment.action";

export const CommentForm = ({id}:{id: string}) => {
    const [comment, setComment] = useState("");
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                await createComment(id, comment);
                setComment("");
            }}
        >
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}