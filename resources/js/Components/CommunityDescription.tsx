interface Community {
    name: string;
    description: string;
    created_at: string;
}

export default function CommunityDescription({ ...props }) {
    const community: Community = props.title;
    const formattedDate = new Date(community.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
    return (
        <div className="bg-reddit-darkest flex w-[480px] flex-col rounded-xl px-4 py-2">
            <div className="flex flex-col">
                <h3 className="text-lg font-bold"> {community.name} </h3>
                <p className="text-reddit-text-secondary">
                    {community.description}
                </p>
                <div className="mt-2 flex flex-row items-center space-x-2 text-sm">
                    <Cake />
                    <p className="text-reddit-text-secondary">
                        Created {formattedDate}
                    </p>
                </div>
            </div>
        </div>
    );
}

function Cake() {
    return (
        <svg
            className="fill-reddit-text-secondary"
            fill="currentColor"
            height="16"
            icon-name="cake-outline"
            viewBox="0 0 20 20"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="m19.426 8.687-8.3-4.73A5.1 5.1 0 0 0 7.746.948c-.84 0-3.587 1.758-3.587 4.125 0 .112.023.218.032.328l-3.816 3.4A1.1 1.1 0 0 0 0 9.623v8.214a1.153 1.153 0 0 0 1.175 1.125L18.819 19c.318 0 .623-.124.85-.347a1.092 1.092 0 0 0 .331-.778V9.652a1.117 1.117 0 0 0-.574-.965ZM7.7 2.195c.387.076 2.382 1.308 2.382 2.878a2.34 2.34 0 1 1-4.675 0C5.409 3.5 7.4 2.271 7.7 2.195ZM18.75 14.75H4.451V16h14.3v1.75l-17.5-.037V11.25h17.5l-.001 3.5Zm0-4.75H1.25v-.3l3.325-2.967a3.555 3.555 0 0 0 6.717-1.24L18.75 9.74V10Z"></path>
        </svg>
    );
}
