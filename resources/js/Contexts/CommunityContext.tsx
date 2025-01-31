import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, useContext } from "react";
import { createContext } from "react";
import { Post } from "./PostContext";

export interface Community {
    id: number;
    name: string;
    description: string;
    icon: string;
    banner: string;
    posts: Post[];
    created_at:string;
    user_id:number;
}

interface CommunityProps extends PageProps {
    community: Community;
}

interface CommunityContextType {
    community: Community
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const useCommunity = (): CommunityContextType => {
    const context = useContext(CommunityContext);

    if(context == undefined) {
        throw new Error('useCommunity must be used with Community.provider');
    }

    return context;
}

export const CommunityProvider = ({ children }: PropsWithChildren) => {
    const { props } = usePage<CommunityProps>();

    if (!props.community) {
        return null;
    }

    return (
        <CommunityContext.Provider value={{ community: props.community }}>
            {children}
        </CommunityContext.Provider>
    );
};
