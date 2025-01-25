import { useForm } from '@inertiajs/react';
import ApplicationLogo from './ApplicationLogo';
import Dropdown from './Dropdown';
import NavButton from './NavButton';
import SearchBar from './SearchBar';

export default function Navbar({ user }) {
    return (
        <nav className="border-reddit-border bg-reddit-dark sticky top-0 border-b px-4 py-1.5">
            <div className="flex flex-row items-center justify-between">
                <ApplicationLogo />
                <SearchBar />
                {user ? loggedIn(user) : guest()}
            </div>
        </nav>
    );
}

function loggedIn(user) {
    const { post } = useForm();

    return (
        <div className="flex flex-row space-x-2">
            <NavButton href="/">
                <div className="flex flex-row items-center justify-center space-x-2">
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
                    <p className="font-semibold">Create</p>
                </div>
            </NavButton>
            <Dropdown>
                <Dropdown.Trigger>
                    <button className="hover:bg-reddit-dark-secondary flex cursor-pointer items-center justify-center rounded-full p-2 text-white">
                        <img
                            className="z-30 h-10 w-10 rounded-full"
                            src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                        />
                    </button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Link href={route('dashboard')}>
                        <div className="flex flex-row items-center space-x-2">
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                            />
                            <div className="flex flex-col">
                                <p> View Profile </p>
                                <p className="text-sm text-gray-500">
                                    u/{user.name}
                                </p>
                            </div>
                        </div>
                    </Dropdown.Link>
                    <Dropdown.Link
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();

                            post(route('logout'));
                        }}
                    >
                        <div className="flex flex-row items-center space-x-2">
                            <svg
                                className="h-8 w-8"
                                fill="currentColor"
                                height="20"
                                icon-name="logout-outline"
                                viewBox="0 0 20 20"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M11.991 10.625H1v-1.25h10.991l-1.933-1.933.884-.884 3 3a.624.624 0 0 1 0 .884l-3 3-.884-.884 1.933-1.933ZM15.375 1h-9.75A2.629 2.629 0 0 0 3 3.625v.792h1.25v-.792A1.377 1.377 0 0 1 5.625 2.25h9.75a1.377 1.377 0 0 1 1.375 1.375v12.75a1.377 1.377 0 0 1-1.375 1.375h-9.75a1.377 1.377 0 0 1-1.375-1.375v-.792H3v.792A2.63 2.63 0 0 0 5.625 19h9.75A2.63 2.63 0 0 0 18 16.375V3.625A2.63 2.63 0 0 0 15.375 1Z"></path>
                            </svg>
                            <p>Logout</p>
                        </div>
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}

function guest() {
    return (
        <div className="flex flex-row space-x-2">
            <NavButton
                href={route('login')}
                className="bg-reddit-orange hover:bg-reddit-orange-hover"
            >
                <div className="flex h-10 items-center justify-center">
                    <p className="text-center font-bold tracking-wide">
                        Log In
                    </p>
                </div>
            </NavButton>
        </div>
    );
}
