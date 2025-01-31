import { Author, Post, usePost } from '@/Contexts/PostContext';
import { Link } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { ReactNode } from 'react';

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
        <>
            {post.community?.name ? (
                <AuthorLink
                    href={route('community.show', post.community.name)}
                    icon={post.community.icon}
                    name={'s/' + post.community.name}
                    timeAgo={timeAgo}
                >
                    <Link
                        href={route('profile', author.name)}
                        className="w-fit text-xs text-gray-600 hover:text-gray-300"
                    >
                        {author.name}
                    </Link>
                </AuthorLink>
            ) : (
                <AuthorLink
                    href={route('profile', author.name)}
                    icon={author.avatar}
                    name={'u/' + author.name}
                    timeAgo={timeAgo}
                />
            )}
        </>
    );
};

export const PostAuthorProps = ({ author, post }: PostAuthorProps) => {
    const timeAgo = formatDistanceToNow(new Date(post.created_at), {
        addSuffix: true,
    });
    return (
        <>
            {post.community?.name ? (
                <AuthorLink
                    href={route('community.show', post.community.name)}
                    icon={post.community.icon}
                    name={'s/' + post.community.name}
                    timeAgo={timeAgo}
                >
                    <Link
                        href={route('profile', author.name)}
                        className="w-fit text-xs text-gray-600 hover:text-gray-300"
                    >
                        {author.name}
                    </Link>
                </AuthorLink>
            ) : (
                <AuthorLink
                    href={route('profile', author.name)}
                    icon={author.avatar}
                    name={'u/' + author.name}
                    timeAgo={timeAgo}
                />
            )}
        </>
    );
};

const Icon = ({ icon }: { icon: string }) => {
    return (
        <img
            className="aspect-square h-8 rounded-full object-cover"
            src={icon}
        />
    );
};

const AuthorLink = ({
    href,
    icon,
    name,
    timeAgo,
    children,
}: {
    href: string;
    icon: string;
    name: string;
    timeAgo: string;
    children?: ReactNode;
}) => {
    return (
        <Link
            href={href}
            className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white"
        >
            <Icon icon={icon} />
            <div className="flex min-h-12 flex-col justify-center space-y-0.5">
                <div className="flex flex-row items-center space-x-2">
                    <span>{name}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-400">{timeAgo}</span>
                </div>
                {children}
            </div>
        </Link>
    );
};
