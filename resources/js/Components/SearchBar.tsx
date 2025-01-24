import TextInput from './TextInput';

export default function SearchBar() {
    return (
        <div className="w-1/3 bg-reddit-dark-secondary flex h-10 items-center rounded-3xl px-3 shadow-lg focus-within:ring-2 focus-within:ring-blue-500">
            <button
                type="submit"
                className="text-gray-400 transition duration-200 hover:text-gray-200"
                aria-label="Search"
            >
                <svg
                    aria-hidden="true"
                    fill="currentColor"
                    height="16"
                    icon-name="search-outline"
                    viewBox="0 0 20 20"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M19.5 18.616 14.985 14.1a8.528 8.528 0 1 0-.884.884l4.515 4.515.884-.884ZM1.301 8.553a7.253 7.253 0 1 1 7.252 7.253 7.261 7.261 0 0 1-7.252-7.253Z"></path>
                </svg>
            </button>
            <TextInput
                id="search"
                name="search"
                placeholder="Search Reddit"
                className="flex-grow bg-transparent px-2 text-sm text-gray-200 placeholder-gray-400 focus:ring-0 focus:outline-none"
            />
        </div>
    );
}
