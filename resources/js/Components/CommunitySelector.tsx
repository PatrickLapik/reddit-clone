import { Community } from '@/Contexts/CommunityContext';
import { User, UserProps } from '@/Contexts/UserContext';
import { ButtonProps } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';

interface CommunitySelectorProps {
    communities: Community[];
    onSelect: (id: number) => void;
}

export default function CommunitySelector({
    communities,
    onSelect,
}: CommunitySelectorProps) {
    const {
        props: {
            auth: { user },
        },
    } = usePage<UserProps>();
    const [selected, setSelected] = useState<Community | User | undefined>(user);
    const { get } = useForm();

    useEffect(() => {
        const selectedName = new URLSearchParams(window.location.search).get(
            'selected',
        );
        if (selectedName) {
            const selection =
                selectedName === user.name
                    ? user
                    : communities.find((c) => c.name === selectedName);

            if (selection) {
                setSelected(selection);
                onSelect(selection === user ? 0 : selection.id);
            }
        }
    }, [communities, user, onSelect]);

    const handleSelect = (selection: Community | User) => {
        setSelected(selection);
        onSelect(selection === user ? 0 : selection.id);

        get(route('post.create', { selected: selection.name }), {
            preserveState: true,
        });
    };

    return (
        <Dropdown>
            <div className="w-fit min-w-48">
                <Dropdown.Trigger>
                    <div className="bg-reddit-dark-secondary flex cursor-pointer items-center justify-between space-x-2 rounded-xl px-2.5 py-3 text-gray-300 hover:brightness-125">
                        {selected && (
                            <div className="flex w-full flex-row items-center space-x-2">
                                <img
                                    className="aspect-square h-8 rounded-full object-cover"
                                    src={
                                        'avatar' in selected
                                            ? selected.avatar
                                            : selected.icon
                                    }
                                />
                                <div className="flex w-full flex-row items-center justify-between">
                                    <div>{selected.name}</div>
                                    <svg
                                        fill="currentColor"
                                        height="20"
                                        icon-name="caret-down-outline"
                                        viewBox="0 0 20 20"
                                        width="20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path>
                                    </svg>
                                </div>
                            </div>
                        )}
                        {!selected && (
                            <>
                                <div>Select a community</div>
                                <svg
                                    fill="currentColor"
                                    height="20"
                                    icon-name="caret-down-outline"
                                    viewBox="0 0 20 20"
                                    width="20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path>
                                </svg>
                            </>
                        )}
                    </div>
                </Dropdown.Trigger>
            </div>
            <Dropdown.Content align="left">
                <UserSelect onClick={() => handleSelect(user)} />
                {communities.map((item) => (
                    <CommunitySelect
                        onClick={() => handleSelect(item)}
                        community={item}
                    />
                ))}
            </Dropdown.Content>
        </Dropdown>
    );
}

const UserSelect = ({ onClick }: ButtonProps) => {
    const { user } = usePage<UserProps>().props.auth;

    return (
        <button
            type="button"
            className="flex cursor-pointer flex-row items-center space-x-2 px-2.5 py-1"
            onClick={onClick}
        >
            <img
                className="aspect-square h-8 rounded-full object-cover"
                src={user.avatar}
            />
            <div className="flex w-full flex-col space-y-1">
                <div className="text-left text-sm text-gray-200 hover:text-white">
                    {'u/' + user.name}
                </div>
                <div className="text-left text-xs text-gray-300">
                    {user.name}
                </div>
            </div>
        </button>
    );
};

interface CommunitySelectProps extends ButtonProps {
    community: Community;
}

const CommunitySelect = ({ onClick, community }: CommunitySelectProps) => {
    return (
        <button
            type="button"
            key={community.id}
            className="flex cursor-pointer flex-row items-center space-x-2 px-2.5 py-1"
            onClick={onClick}
        >
            <img
                className="aspect-square h-8 rounded-full object-cover"
                src={community.icon}
            />
            <div className="flex w-full flex-col space-y-1">
                <div className="text-left text-sm text-gray-200 hover:text-white">
                    {'s/' + community.name}
                </div>
                <div className="text-xs text-gray-300">members 69</div>
            </div>
        </button>
    );
};
