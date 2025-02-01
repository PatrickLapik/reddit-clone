import { Author, Post } from '@/Contexts/PostContext';
import { Link } from '@inertiajs/react';
import { PostAuthorProps } from './PostAuthor';
import Vote from './Vote';

interface PostCardProps {
    href: string;
    post: Post;
    author: Author;
}

export default function PostCard({ author, post, href }: PostCardProps) {
    return (
        <div className="hover:bg-reddit-dark-secondary flex flex-col space-y-2 rounded-3xl px-4 py-2.5">
            <Link href={href} className="flex flex-col">
                <div className="text-wrap">
                    <PostAuthorProps author={author} post={post} />
                    <div className="mt-3 text-xl font-semibold">
                        {post.title}
                    </div>
                    {post.body && (
                        <p className="text-balance">
                            {post.body.substring(0, 100)}
                            {post.body.length > 100 ? '...' : ''}
                        </p>
                    )}
                </div>
            </Link>

            <Vote
                userVote={post.votes?.[0]}
                voteSum={post.votes_sum_value}
                voteableType="post"
                voteableId={post.id}
            />
        </div>
    );
}
