import { UserProps } from '@/Contexts/UserContext';
import CommunityCreateFormModal from '@/Pages/Community/CommunityCreateFormModal';
import { usePage } from '@inertiajs/react';
import Collapse from './Collapse';
import SideButton from './SideButton';
import Break from './Break';

export default function SideBar() {
    const joinedCommunities = usePage<UserProps>().props.auth.joinedCommunities;
    const user = usePage<UserProps>().props.auth.user;

    return (
        <nav
            style={{ scrollbarWidth: 'thin', scrollBehavior: 'smooth' }}
            className="bg-reddit-dark border-r-reddit-border fixed top-[69px] flex h-[calc(100vh-69px)] min-w-72 flex-col justify-between overflow-auto border-r p-4 text-white"
        >
            <div className="flex flex-col max-h-full overflow-auto">
                <SideButton href="/">
                    <Home />
                    <p>Home</p>
                </SideButton>
                <SideButton href="/">
                    <Popular />
                    <p>Popular</p>
                </SideButton>
                <SideButton href="/">
                    <Explore />
                    <p>Explore</p>
                </SideButton>
                <SideButton href="/">
                    <All />
                    <p>All</p>
                </SideButton>
                <Break />
                {user && (
                    <>
                        <Collapse>
                            <Collapse.Trigger>
                                <p className="text-lg">Communities</p>
                            </Collapse.Trigger>
                            <Collapse.Content>
                                <CommunityCreateFormModal>
                                    <div className="flex h-8 w-full flex-row items-center justify-start space-x-2">
                                        <svg
                                            fill="currentColor"
                                            height="20"
                                            icon-name="add-outline"
                                            viewBox="0 0 20 20"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            data-darkreader-inline-fill=""
                                        >
                                            <path d="M19 9.375h-8.375V1h-1.25v8.375H1v1.25h8.375V19h1.25v-8.375H19v-1.25Z"></path>
                                        </svg>
                                        <p className="text-gray-300">
                                            Create Community
                                        </p>
                                    </div>
                                </CommunityCreateFormModal>
                                {joinedCommunities.map((item) => (
                                    <Collapse.Link
                                        className="flex max-h-12 flex-row items-center space-x-2"
                                        href={route('community.show', {
                                            community: item.name,
                                        })}
                                    >
                                        <img
                                            className="border-reddit-border aspect-square h-8 rounded-full border"
                                            src={item.icon}
                                        />
                                        <p className="h-full">{item.name}</p>
                                    </Collapse.Link>
                                ))}
                            </Collapse.Content>
                        </Collapse>
                    </>
                )}
            </div>
            <p className="text-reddit-border text-center text-xs">
                PLS DON'T SUE ME
            </p>
        </nav>
    );
}

// Icons


function Home() {
    return (
        <svg
            fill="currentColor"
            height="20"
            icon-name="home-outline"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="m17.71 8.549 1.244.832v8.523a1.05 1.05 0 0 1-1.052 1.046H12.73a.707.707 0 0 1-.708-.707v-4.507c0-.76-1.142-1.474-2.026-1.474-.884 0-2.026.714-2.026 1.474v4.507a.71.71 0 0 1-.703.707H2.098a1.046 1.046 0 0 1-1.052-1.043V9.381l1.244-.835v9.158h4.44v-3.968c0-1.533 1.758-2.72 3.27-2.72s3.27 1.187 3.27 2.72v3.968h4.44V8.549Zm2.04-1.784L10.646.655a1.12 1.12 0 0 0-1.28-.008L.25 6.765l.696 1.036L10 1.721l9.054 6.08.696-1.036Z"></path>
        </svg>
    );
}

function Popular() {
    return (
        <svg
            fill="currentColor"
            height="20"
            icon-name="popular-outline"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 0a10 10 0 1 0 10 10A10.01 10.01 0 0 0 10 0Zm0 18.75a8.7 8.7 0 0 1-5.721-2.145l8.471-8.471v4.148H14V6.638A.647.647 0 0 0 13.362 6H7.718v1.25h4.148L3.4 15.721A8.739 8.739 0 1 1 10 18.75Z"></path>
        </svg>
    );
}

function Explore() {
    return (
        <svg
            fill="currentColor"
            height="20"
            icon-name="communities-outline"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="m18.937 19.672-2.27-2.23A9.917 9.917 0 0 1 10 20a10.032 10.032 0 0 1-7.419-3.297 1.976 1.976 0 0 1-.475-1.418 3.455 3.455 0 0 1 2.173-3.207c.426-.17.881-.255 1.34-.248h2.49a3.569 3.569 0 0 1 3.616 3.504v1.57h-1.25v-1.565a2.313 2.313 0 0 0-2.366-2.256h-2.49a2.243 2.243 0 0 0-2.098 1.388c-.113.275-.17.57-.167.868a.784.784 0 0 0 .143.52A8.778 8.778 0 0 0 10 18.752a8.694 8.694 0 0 0 6.234-2.607l.084-.085v-.72a2.235 2.235 0 0 0-2.218-2.256h-2.361v-1.248H14.1a3.492 3.492 0 0 1 3.464 3.504v1.237l2.245 2.206-.872.89ZM4.63 8.53a2.443 2.443 0 0 1 1.511-2.259A2.45 2.45 0 0 1 9.48 8.053a2.443 2.443 0 0 1-2.401 2.923A2.451 2.451 0 0 1 4.63 8.53Zm1.25 0a1.198 1.198 0 0 0 1.434 1.176 1.2 1.2 0 0 0 .875-1.634 1.2 1.2 0 0 0-2.309.458Zm4.794 0a2.443 2.443 0 0 1 1.511-2.259 2.45 2.45 0 0 1 3.338 1.782 2.443 2.443 0 0 1-2.401 2.923 2.451 2.451 0 0 1-2.448-2.446Zm1.25 0a1.197 1.197 0 0 0 1.434 1.176 1.2 1.2 0 0 0 .875-1.634 1.2 1.2 0 0 0-2.309.458ZM1.25 10.01A8.733 8.733 0 0 1 4.361 3.3a8.753 8.753 0 0 1 10.654-.48 8.745 8.745 0 0 1 3.702 6.406 8.732 8.732 0 0 1-.498 3.756l.714 1.498a9.98 9.98 0 0 0-2.62-12.237A10.005 10.005 0 0 0 .992 5.652a9.98 9.98 0 0 0-.103 8.454l.729-1.598a8.723 8.723 0 0 1-.368-2.497Z"></path>
        </svg>
    );
}

function All() {
    return (
        <svg
            fill="currentColor"
            height="20"
            icon-name="all-outline"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 0a10 10 0 1 0 10 10A10.01 10.01 0 0 0 10 0Zm5 17.171V6h-1.25v11.894a8.66 8.66 0 0 1-2.75.794V10H9.75v8.737A8.684 8.684 0 0 1 6.47 18H7v-4H5.75v3.642a8.753 8.753 0 1 1 9.25-.471Z"></path>
        </svg>
    );
}
