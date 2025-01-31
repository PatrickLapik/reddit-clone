import { Post } from '@/Contexts/PostContext';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface VoteProps {
    postData: Post;
}

export default function Vote({ postData }: VoteProps) {
    const [selected, setSelected] = useState<1 | -1 | undefined>(undefined);

    const {
        post,
        patch,
        delete: destroy,
        transform,
    } = useForm({
        value: 1,
        voteable_type: 'post',
        voteable_id: postData.id,
    });

    useEffect(() => {
        const userVote = postData.votes?.[0]?.value;
        setSelected(userVote || undefined);
    }, [postData.votes]);

    const handleSelect = (target: 1 | -1) => {
        const oldVote = selected;
        const newVote = oldVote === target ? undefined : target;

        setSelected(newVote);

        if (newVote) {
            transform((data) => ({
                ...data,
                value: newVote,
            }));
        }

        if (oldVote === undefined && newVote !== undefined) {
            post(route('vote.store'), {
                preserveScroll: true,
            });
        } else if (newVote === undefined) {
            destroy(route('vote.destroy', { vote: postData.votes?.[0].id }), {
                preserveScroll: true,
            });
        } else {
            patch(route('vote.update', { vote: postData.votes?.[0].id }), {
                preserveScroll: true,
            });
        }
    };

    return (
        <div
            className={`${selected == undefined && 'bg-reddit-border'} flex w-fit items-center space-x-1 rounded-full ${selected == 1 ? 'bg-reddit-orange' : 'bg-blue-400'}`}
        >
            <button
                className="hover:bg-reddit-border-secondary group flex aspect-square h-8 cursor-pointer items-center justify-center rounded-full p-0.5"
                onClick={() => handleSelect(1)}
            >
                <Arrow
                    className="group-hover:fill-reddit-orange"
                    filled={selected == 1}
                />
            </button>
            <div className="text-xs text-gray-300">
                {postData.votes_sum_value || 0}
            </div>
            <button
                className="hover:bg-reddit-border-secondary group flex aspect-square h-8 rotate-180 cursor-pointer items-center justify-center rounded-full p-0.5"
                onClick={() => handleSelect(-1)}
            >
                <Arrow
                    className="group-hover:fill-blue-400"
                    filled={selected == -1}
                />
            </button>
        </div>
    );
}

const Arrow = ({
    className,
    filled,
}: {
    className?: string;
    filled?: boolean;
}) => {
    return filled ? (
        <svg
            className={className}
            fill="currentColor"
            height="16"
            viewBox="0 0 20 20"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 19c-.072 0-.145 0-.218-.006A4.1 4.1 0 0 1 6 14.816V11H2.862a1.751 1.751 0 0 1-1.234-2.993L9.41.28a.836.836 0 0 1 1.18 0l7.782 7.727A1.751 1.751 0 0 1 17.139 11H14v3.882a4.134 4.134 0 0 1-.854 2.592A3.99 3.99 0 0 1 10 19Z"></path>
        </svg>
    ) : (
        <svg
            className={className}
            fill="currentColor"
            height="16"
            viewBox="0 0 20 20"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 19c-.072 0-.145 0-.218-.006A4.1 4.1 0 0 1 6 14.816V11H2.862a1.751 1.751 0 0 1-1.234-2.993L9.41.28a.836.836 0 0 1 1.18 0l7.782 7.727A1.751 1.751 0 0 1 17.139 11H14v3.882a4.134 4.134 0 0 1-.854 2.592A3.99 3.99 0 0 1 10 19Zm0-17.193L2.685 9.071a.251.251 0 0 0 .177.429H7.5v5.316A2.63 2.63 0 0 0 9.864 17.5a2.441 2.441 0 0 0 1.856-.682A2.478 2.478 0 0 0 12.5 15V9.5h4.639a.25.25 0 0 0 .176-.429L10 1.807Z"></path>
        </svg>
    );
};
