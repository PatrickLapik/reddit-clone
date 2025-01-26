import { User } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import ApplicationLogo from './ApplicationLogo';
import Dropdown from './Dropdown';
import NavButton from './NavButton';
import SearchBar from './SearchBar';

export default function Navbar() {
    const user = usePage().props.auth.user as User & { avatar?: string };
    return (
        <nav className="border-reddit-border bg-reddit-dark sticky top-0 z-40 border-b px-4 py-1.5">
            <div className="flex flex-row items-center justify-between">
                <ApplicationLogo />
                <SearchBar />
                {user ? loggedIn(user) : guest()}
            </div>
        </nav>
    );
}

function loggedIn(user: User & { avatar?: string}) {
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
                            className="z-30 h-10 w-10 rounded-full object-cover"
                            src={user.avatar}
                        />
                    </button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Link href={route('dashboard')}>
                        <div className="flex flex-row items-center space-x-2">
                            <img
                                className="h-8 w-8 rounded-full object-cover"
                                src={user.avatar}
                            />
                            <div className="flex flex-col">
                                <p> View Profile </p>
                                <p className="text-sm text-gray-500">
                                    u/{user.name}
                                </p>
                            </div>
                        </div>
                    </Dropdown.Link>
                    <Dropdown.Link href={route('settings.account')}>
                        <div className="flex flex-row items-center space-x-2">
                            <svg
                                className="h-6 w-6"
                                fill="currentColor"
                                height="20"
                                icon-name="settings-outline"
                                viewBox="0 0 20 20"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M10 20c-.401 0-.802-.027-1.2-.079a1.145 1.145 0 0 1-.992-1.137v-1.073a.97.97 0 0 0-.627-.878A.98.98 0 0 0 6.1 17l-.755.753a1.149 1.149 0 0 1-1.521.1 10.16 10.16 0 0 1-1.671-1.671 1.149 1.149 0 0 1 .1-1.523L3 13.906a.97.97 0 0 0 .176-1.069.98.98 0 0 0-.887-.649H1.216A1.145 1.145 0 0 1 .079 11.2a9.1 9.1 0 0 1 0-2.393 1.145 1.145 0 0 1 1.137-.992h1.073a.97.97 0 0 0 .878-.627A.979.979 0 0 0 3 6.1l-.754-.754a1.15 1.15 0 0 1-.1-1.522 10.16 10.16 0 0 1 1.673-1.676 1.155 1.155 0 0 1 1.522.1L6.1 3a.966.966 0 0 0 1.068.176.98.98 0 0 0 .649-.887V1.216A1.145 1.145 0 0 1 8.8.079a9.129 9.129 0 0 1 2.393 0 1.144 1.144 0 0 1 .991 1.137v1.073a.972.972 0 0 0 .628.878A.977.977 0 0 0 13.905 3l.754-.754a1.152 1.152 0 0 1 1.522-.1c.62.49 1.18 1.05 1.671 1.671a1.15 1.15 0 0 1-.1 1.522L17 6.1a.967.967 0 0 0-.176 1.068.98.98 0 0 0 .887.649h1.073a1.145 1.145 0 0 1 1.137.991 9.096 9.096 0 0 1 0 2.392 1.145 1.145 0 0 1-1.137.992h-1.073A1.041 1.041 0 0 0 17 13.905l.753.755a1.149 1.149 0 0 1 .1 1.521c-.49.62-1.05 1.18-1.671 1.671a1.149 1.149 0 0 1-1.522-.1L13.906 17a.97.97 0 0 0-1.069-.176.981.981 0 0 0-.65.887v1.073a1.144 1.144 0 0 1-.99 1.137A9.431 9.431 0 0 1 10 20Zm-.938-1.307a7.638 7.638 0 0 0 1.875 0v-.982a2.292 2.292 0 0 1 3.853-1.6l.693.694a8.796 8.796 0 0 0 1.326-1.326l-.694-.694a2.29 2.29 0 0 1 1.6-3.851h.982a7.746 7.746 0 0 0 0-1.876h-.982a2.213 2.213 0 0 1-2.034-1.4 2.223 2.223 0 0 1 .438-2.451l.694-.693a8.76 8.76 0 0 0-1.327-1.326l-.692.694a2.22 2.22 0 0 1-2.434.445 2.221 2.221 0 0 1-1.419-2.041v-.979a7.638 7.638 0 0 0-1.875 0v.982a2.213 2.213 0 0 1-1.4 2.034 2.23 2.23 0 0 1-2.456-.438l-.693-.694a8.757 8.757 0 0 0-1.326 1.327l.694.692a2.216 2.216 0 0 1 .445 2.434 2.22 2.22 0 0 1-2.041 1.418h-.982a7.746 7.746 0 0 0 0 1.876h.982a2.213 2.213 0 0 1 2.034 1.4 2.223 2.223 0 0 1-.438 2.451l-.694.693c.394.488.838.933 1.326 1.326l.694-.694a2.218 2.218 0 0 1 2.433-.445 2.22 2.22 0 0 1 1.418 2.041v.983ZM10 13.229a3.23 3.23 0 1 1 0-6.458 3.23 3.23 0 0 1 0 6.458Zm0-5.208a1.979 1.979 0 1 0 0 3.958 1.979 1.979 0 0 0 0-3.958Z"></path>
                            </svg>

                            <p>Settings</p>
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
                                className="h-6 w-6"
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
