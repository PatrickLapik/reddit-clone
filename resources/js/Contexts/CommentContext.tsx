import { Author, Vote } from "./PostContext";

export interface Comment {
    id: number;
    user: Author;
    comment_id: number;
    post_id: number;
    body: string;
    replies: Comment[];
    votes: Vote[];
    votes_sum_value: number;
    created_at: string;
    updated_at: string;
}

