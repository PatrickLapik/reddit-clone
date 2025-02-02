import { usePage } from '@inertiajs/react';
import { createContext, PropsWithChildren, ReactNode, useContext, useState } from 'react';
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
    comments_count: number;
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

interface PostsContextProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  nextPageUrl: string;
  setNextPageUrl: React.Dispatch<React.SetStateAction<string>>;
}

const PostsContext = createContext<PostsContextProps | undefined>(undefined);

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) throw new Error('usePosts must be used within a PostsProvider');
  return context;
};

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState('');

  return (
    <PostsContext.Provider value={{ posts, setPosts, nextPageUrl, setNextPageUrl }}>
      {children}
    </PostsContext.Provider>
  );
};
