import { usePage } from '@inertiajs/react';
import { createContext, PropsWithChildren, useContext } from 'react';
import { UserProps } from './UserContext';

interface PostContextType {
    post: Post;
    author: Author;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    created_at: string;
}

export interface Author {
    id: number;
    name: string;
    avatar: string;
}

export interface PostProps extends UserProps {
    post: Post;
    author: Author;
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

    if (props.post && props.author) {
        return (
            <PostContext.Provider
                value={{ post: props.post, author: props.author }}
            >
                {children}
            </PostContext.Provider>
        );
    }
    return (
        <PostContext.Provider
            value={{ post: props.profile.posts[0], author: props.profile }}
        >
            {children}
        </PostContext.Provider>
    );
};
