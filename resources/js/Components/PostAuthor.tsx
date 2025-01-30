import { Author, Post, usePost } from '@/Contexts/PostContext';
import { Link } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';

interface PostAuthorProps {
    author: Author;
    post: Post;
}

export const PostAuthorContext = () => {
    const { author, post } = usePost();
    const timeAgo = formatDistanceToNow(new Date(post.created_at), {
        addSuffix: true,
    });
    return (
        <div className="flex flex-col space-y-0.5">
            <div className="flex flex-row items-center space-x-2">
                <Link
                    href={route('profile', author.name)}
                    className="text-sm text-gray-300 hover:text-white"
                >
                    <span>u/{author.name}</span>
                </Link>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-400">{timeAgo}</span>
            </div>

            <Link
                href={route('profile', author.name)}
                className="text-xs text-gray-600 hover:text-gray-300"
            >
                {author.name}
            </Link>
        </div>
    );
};

export const PostAuthorProps = ({ author, post }: PostAuthorProps) => {
    const timeAgo = formatDistanceToNow(new Date(post.created_at), {
        addSuffix: true,
    });
    return (
        <div className="flex flex-col space-y-0.5">
            <div className="flex flex-row items-center space-x-2">
                <Link
                    href={route('profile', author.name)}
                    className="text-sm text-gray-300 hover:text-white"
                >
                    <span>u/{author.name}</span>
                </Link>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-400">{timeAgo}</span>
            </div>

            <Link
                href={route('profile', author.name)}
                className="text-xs text-gray-600 hover:text-gray-300"
            >
                {author.name}
            </Link>
        </div>
    );
};


