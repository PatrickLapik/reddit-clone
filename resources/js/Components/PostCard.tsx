import { Author, Post } from '@/Contexts/PostContext';
import { Link } from '@inertiajs/react';
import { PostAuthorProps } from './PostAuthor';

interface PostCardProps {
    href: string;
    post: Post;
    author: Author;
}

export default function PostCard({ author, post, href }: PostCardProps) {
    return (
        <Link
            href={href}
            className="hover:bg-reddit-dark-secondary flex flex-col rounded-3xl px-4 py-2.5"
        >
            <div className="text-wrap">
                <PostAuthorProps author={author} post={post} />
                <div className="mt-3 text-xl font-semibold">{post.title}</div>
                <p className="text-balance">
                    {post.body.substring(0, 100)}
                    {post.body.length > 100 ? '...' : ''}
                </p>
            </div>
        </Link>
    );
}
