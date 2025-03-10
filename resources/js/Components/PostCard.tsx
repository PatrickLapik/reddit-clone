import { Author, Post } from '@/Contexts/PostContext';
import { Link } from '@inertiajs/react';
import { FileCarousel } from './FileCarousel';
import { PostAuthorProps } from './PostAuthor';
import Vote from './Vote';

interface PostCardProps {
    href: string;
    post: Post;
    author: Author;
}

export default function PostCard({ author, post, href }: PostCardProps) {
    return (
        <div className="hover:bg-reddit-dark-secondary flex flex-col space-y-3 rounded-3xl px-4 py-2.5">
            <div className="text-wrap">
                <PostAuthorProps author={author} post={post} />
                <Link className="mt-3 text-xl font-semibold" href={href}>
                    {post.title}
                </Link>
                {post.body && post.media?.length < 0 && (
                    <p className="text-sm whitespace-pre-line text-gray-400">
                        {post.body.substring(0, 300)}
                        {post.body.length > 300 ? '...' : ''}
                    </p>
                )}
                {post.media?.length > 0 && <FileCarousel media={post.media} />}
            </div>
            <div className="flex items-center space-x-2">
                <Vote
                    className=""
                    userVote={post.votes?.[0]}
                    voteSum={post.votes_sum_value}
                    voteableType="post"
                    voteableId={post.id}
                />
                <Link href={href}>
                    <Comments commentCount={post.comments_count} />
                </Link>
            </div>
        </div>
    );
}

export const Comments = ({ commentCount }: { commentCount: number }) => {
    return (
        <div className="hover:bg-reddit-border-secondary bg-reddit-border flex items-center space-x-1 rounded-full px-4 text-xs">
            <svg
                className="h-8"
                fill="currentColor"
                height="16"
                icon-name="comment-outline"
                viewBox="0 0 20 20"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M10 19H1.871a.886.886 0 0 1-.798-.52.886.886 0 0 1 .158-.941L3.1 15.771A9 9 0 1 1 10 19Zm-6.549-1.5H10a7.5 7.5 0 1 0-5.323-2.219l.54.545L3.451 17.5Z"></path>
            </svg>
            <p>{commentCount}</p>
        </div>
    );
};
