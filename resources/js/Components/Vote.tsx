import type { Vote } from '@/Contexts/PostContext';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface VoteProps {
    userVote?: Vote;
    voteSum?: number;
    voteableType: 'post' | 'comment';
    voteableId: number;
    className?: string;
}

export default function Vote({
    userVote,
    voteSum,
    voteableType,
    voteableId,
    className,
}: VoteProps) {
    const [selected, setSelected] = useState<1 | -1 | undefined>(undefined);

    const {
        post,
        patch,
        delete: destroy,
        transform,
        processing,
    } = useForm({
        value: 1,
        voteable_type: voteableType,
        voteable_id: voteableId,
    });

    useEffect(() => {
        const currentUserVote = userVote?.value;
        setSelected(currentUserVote || undefined);
    }, [userVote]);

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
            destroy(route('vote.destroy', { vote: userVote?.id }), {
                preserveScroll: true,
            });
        } else {
            patch(route('vote.update', { vote: userVote?.id }), {
                preserveScroll: true,
            });
        }
    };

    let commonClasses = 'flex w-fit items-center space-x-1 rounded-full';
    let commentVoterClasses = `${commonClasses}`;
    let postVoterClasses = `${selected == undefined && 'bg-reddit-border'} ${commonClasses} ${selected == 1 ? 'bg-reddit-orange' : 'bg-blue-400'}`;

    return (
        <div
            className={`${voteableType === 'post' ? postVoterClasses : commentVoterClasses} ${className}`}
        >
            <VoteButton
                selected={selected == 1}
                onClick={() => handleSelect(1)}
                arrowClassName={`group-hover:fill-reddit-orange ${voteableType === 'comment' && selected !== 1 && 'opacity-50'} ${voteableType === 'comment' && selected == 1 && 'fill-reddit-orange'}`}
                disabled={processing}
            />

            <div className={`text-xs text-gray-300 font-semibold ${voteableType === 'comment' && 'opacity-50'}`}>{voteSum || 0}</div>
            <VoteButton
                selected={selected == -1}
                onClick={() => handleSelect(-1)}
                arrowClassName={`group-hover:fill-blue-400 rotate-180 ${voteableType === 'comment' && selected !== -1 && 'opacity-50'} ${voteableType === 'comment' && selected == -1 && 'fill-blue-400'}`}
                disabled={processing}
            />
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

const VoteButton = ({
    disabled,
    onClick,
    selected,
    className,
    arrowClassName,
}: {
    disabled?: boolean;
    onClick: () => void;
    selected: boolean;
    className?: string;
    arrowClassName?: string;
}) => {
    return (
        <button
            className={`hover:bg-reddit-border-secondary group flex aspect-square h-8 cursor-pointer items-center justify-center rounded-full p-0.5 ${className}`}
            onClick={() => onClick()}
            disabled={disabled}
        >
            <Arrow className={`${arrowClassName}`} filled={selected} />
        </button>
    );
};
