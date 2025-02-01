import { timeAgo } from '@/Components/PostAuthor';
import Vote from '@/Components/Vote';
import { Comment } from '@/Contexts/CommentContext';
import { Author } from '@/Contexts/PostContext';
import { Link } from '@inertiajs/react';

interface CommentCardProps {
    comment: Comment;
}

interface CommentAuthorProps {
    author: Author;
    time: string;
}

export default function CommentCard({ comment }: CommentCardProps) {
    return (
        <div className="flex flex-col items-start">
            <div className="flex flex-col items-start space-y-3 py-2.5 px-2">
                <CommentAuthor
                    author={comment.user}
                    time={comment.created_at}
                />
                <CommentBody body={comment.body} />
            </div>
            <Vote
                voteableType="comment"
                voteableId={comment.id}
                voteSum={comment.votes_sum_value}
                userVote={comment.votes[0]}
            />
        </div>
    );
}

const CommentAuthor = ({ author, time }: CommentAuthorProps) => {
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
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-400">{passedTime}</span>
            </Link>
        </div>
    );
};

const CommentBody = ({ body }: { body: string }) => {
    return <div className="h-fit w-full text-gray-300 opacity-60">{body}</div>;
};
