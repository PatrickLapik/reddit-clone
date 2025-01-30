import { PageProps, User as UserType } from '@/types';
import { usePage } from '@inertiajs/react';
import { createContext, PropsWithChildren, useContext } from 'react';
import { Community } from './CommunityContext';
import { Post } from './PostContext';

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
    posts: Post[];
}


export interface UserProps extends PageProps {
    auth: { joinedCommunities: Community[]; user: User };
    isJoined: boolean;
    profile: Profile;
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
