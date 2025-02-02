import { PageProps, User as UserType } from '@/types';
import { usePage } from '@inertiajs/react';
import { createContext, PropsWithChildren, useContext } from 'react';
import { Community } from './CommunityContext';
import { Post } from './PostContext';
import type { Comment } from './CommentContext';

export interface User extends UserType {
    avatar: string;
}

interface UserContextType {
    user: User;
}

interface Profile {
    id: number;
    name: string;
    avatar: string;
}

interface Permissions {
    edit_post?: boolean;
}

interface Pagination {
    total: number;
    per_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string;
    data: Post[]
}


export interface UserProps extends PageProps {
    auth: { joinedCommunities: Community[]; user: User };
    isJoined?: boolean;
    paginated_posts: Pagination;
    profile: Profile;
    community?: Community;
    posts?: Post[];
    post?: Post;
    comments?: Comment[];
    can?: Permissions;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    if (context == undefined) {
        throw new Error('useUser must be used with UserContext.provider');
    }

    return context;
};

export const UserProvider = ({ children }: PropsWithChildren) => {
    const { props } = usePage<UserProps>();

    if (!props.auth.user) {
        return null;
    }

    return (
        <UserContext.Provider value={{ user: props.auth.user }}>
            {children}
        </UserContext.Provider>
    );
};
