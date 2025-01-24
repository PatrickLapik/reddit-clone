import ApplicationLogo from './ApplicationLogo';
import NavButton from './NavButton';
import SearchBar from './SearchBar';

export default function Navbar() {
    return (
        <nav className="border-reddit-border bg-reddit-dark border-b px-4 py-1.5 sticky top-0">
            <div className="flex flex-row items-center justify-between">
                <ApplicationLogo />
                <SearchBar />
                <div className='flex flex-row space-x-2'>
                    <NavButton href="/">
                        <div className='flex-row flex items-center justify-center space-x-2'>
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
                        <p className='font-semibold'>Create</p>
                        </div>
                    </NavButton>
                    <NavButton href={route('dashboard')}>
                        <img className='h-10 w-10 rounded-full z-30' src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"/>
                    </NavButton>
                </div>
            </div>
        </nav>
    );
}
