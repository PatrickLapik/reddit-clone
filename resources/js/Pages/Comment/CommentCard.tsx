import { timeAgo } from '@/Components/PostAuthor';
import Vote from '@/Components/Vote';
import { Comment } from '@/Contexts/CommentContext';
import { Author, usePost } from '@/Contexts/PostContext';
import { UserProps } from '@/Contexts/UserContext';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ChangeEvent, useState } from 'react';
import EditEditable from '../Post/Edit';
import { OptionsDropdown } from '../Post/View';
import CommentForm from './CommentForm';

interface CommentCardProps {
    comment: Comment;
}

interface CommentAuthorProps {
    author: Author;
    time: string;
    OP: boolean;
    edited: boolean;
}

export default function CommentCard({ comment }: CommentCardProps) {
    const { post } = usePost();
    const { can } = usePage<UserProps>().props;
    const {
        post: postReq,
        delete: destroy,
        setData,
        data,
    } = useForm({
        body: comment.body,
    });
    const [showForm, setShowForm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const canEditComment = can?.edit_comments?.find(
        (item) => item.id === comment.id,
    );

    const edited = new Date(comment.updated_at) > new Date(comment.created_at);

    const handleOnEdit = () => {
        setShowEdit((prev) => !prev);
    };

    const handleOnSave = () => {
        postReq(route('comment.update', { comment: comment.id }), {
            onSuccess: () => handleOnEdit(),
            preserveScroll: true,
        });
    };

    const handleDelete = () => {
        destroy(route('comment.destroy', { comment: comment.id }), {
            preserveScroll: true,
        });
    };

    const handleClick = () => {
        setShowForm((prev) => !prev);
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData('body', e.target.value);
    };
    return (
        <div className="flex flex-col items-start">
            <div className="flex flex-col items-start space-y-3 px-2 py-2.5">
                <div className="flex w-full items-center justify-between space-x-2">
                    <CommentAuthor
                        OP={post.user.id === comment.user.id}
                        author={comment.user}
                        time={comment.created_at}
                        edited={edited}
                    />
                    {canEditComment && (
                        <OptionsDropdown
                            onClickEdit={handleOnEdit}
                            onClickDelete={handleDelete}
                        />
                    )}
                </div>
                {showEdit ? (
                    <EditEditable
                        onCancel={handleOnEdit}
                        onChange={handleChange}
                        onSave={handleOnSave}
                        textAreaValue={data.body}
                    />
                ) : (
                    <CommentBody body={comment.body} />
                )}
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

            {showForm && (
                <CommentForm
                    parentComment={comment.id}
                    onSubmit={handleClick}
                />
            )}
        </div>
    );
}

const CommentAuthor = ({ author, time, OP, edited }: CommentAuthorProps) => {
    const passedTime = timeAgo(time);
    return (
        <div className="flex space-x-2">
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
                {edited && <p className="text-sm text-gray-400">[edited]</p>}
            </Link>
        </div>
    );
};

const CommentBody = ({ body }: { body: string }) => {
    return (
        <div className="h-fit w-full whitespace-pre-line text-gray-300 opacity-60">
            {body}
        </div>
    );
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
