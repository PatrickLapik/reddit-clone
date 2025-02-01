import { timeAgo } from '@/Components/PostAuthor';
import Vote from '@/Components/Vote';
import { Comment } from '@/Contexts/CommentContext';
import { Author, usePost } from '@/Contexts/PostContext';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import CommentForm from './CommentForm';

interface CommentCardProps {
    comment: Comment;
}

interface CommentAuthorProps {
    author: Author;
    time: string;
    OP: boolean;
}

export default function CommentCard({ comment }: CommentCardProps) {
    const { post } = usePost();
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm((prev) => !prev);
    };
    return (
        <div className="flex flex-col items-start">
            <div className="flex flex-col items-start space-y-3 px-2 py-2.5">
                <CommentAuthor
                    OP={post.user.id === comment.user.id}
                    author={comment.user}
                    time={comment.created_at}
                />
                <CommentBody body={comment.body} />
            </div>
            <div className="flex flex-row items-center space-x-2">
                <Vote
                    voteableType="comment"
                    voteableId={comment.id}
                    voteSum={comment.votes_sum_value}
                    userVote={comment.votes[0]}
                />
                <Reply onClick={handleClick} />
            </div>

            {showForm && <CommentForm parentComment={comment.id} onSubmit={handleClick}/>}
        </div>
    );
}

const CommentAuthor = ({ author, time, OP }: CommentAuthorProps) => {
    const passedTime = timeAgo(time);
    return (
        <div className="flex items-center space-x-2">
            <img
                className="aspect-square h-6 rounded-full object-cover"
                src={author.avatar}
            />
            <Link
                className="flex space-x-2 text-sm text-gray-300 hover:text-white"
                href={route('profile', { name: author.name })}
            >
                <p>{author.name}</p>
                {OP && <span className="text-sm text-blue-600">OP</span>}
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-400">{passedTime}</span>
            </Link>
        </div>
    );
};

const CommentBody = ({ body }: { body: string }) => {
    return <div className="h-fit w-full text-gray-300 opacity-60 whitespace-pre-line">{body}</div>;
};

const Reply = ({ onClick }: { onClick: () => void }) => {
    return (
        <>
            <button
                className="hover:bg-reddit-dark-secondary flex cursor-pointer flex-row items-center space-x-1 rounded-full px-4 py-2.5 text-sm opacity-50"
                onClick={onClick}
            >
                <svg
                    fill="currentColor"
                    height="16"
                    icon-name="comment-outline"
                    viewBox="0 0 20 20"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M10 19H1.871a.886.886 0 0 1-.798-.52.886.886 0 0 1 .158-.941L3.1 15.771A9 9 0 1 1 10 19Zm-6.549-1.5H10a7.5 7.5 0 1 0-5.323-2.219l.54.545L3.451 17.5Z"></path>
                </svg>
                <p>Reply</p>
            </button>
        </>
    );
};
