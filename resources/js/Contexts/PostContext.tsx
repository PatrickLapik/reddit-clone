import { usePage } from '@inertiajs/react';
import { createContext, PropsWithChildren, useContext } from 'react';
import { Community } from './CommunityContext';
import { User, UserProps } from './UserContext';

interface PostContextType {
    post: Post;
    author: Author;
}

export interface Post {
    id: number;
    title: string;
    body?: string;
    created_at: string;
    community?: Community;
    user: User;
    votes_sum_value?: number;
    votes?: Vote[];
}

export interface Vote {
    id: number;
    voteable_id: number;
    value: -1 | 1 | undefined;
}

export interface Author {
    id: number;
    name: string;
    avatar: string;
}

export interface PostProps extends UserProps {
    post: Post;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePost = (): PostContextType => {
    const context = useContext(PostContext);

    if (context == undefined) {
        throw new Error('usePost must be used with PostContext.provider');
    }

    return context;
};

export const PostProvider = ({ children }: PropsWithChildren) => {
    const { props } = usePage<PostProps>();

    if (!props.post && !props.author && !props.profile) {
        return null;
    }

    if (props.post && props.post.user) {
        return (
            <PostContext.Provider
                value={{ post: props.post, author: props.post.user }}
            >
                {children}
            </PostContext.Provider>
        );
    }
    return (
        <PostContext.Provider
            value={{ post: props.post, author: props.profile }}
        >
            {children}
        </PostContext.Provider>
    );
};
