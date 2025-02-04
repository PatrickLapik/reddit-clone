import Break from '@/Components/Break';
import Dropdown from '@/Components/Dropdown';
import { PostAuthorContext } from '@/Components/PostAuthor';
import { Comments } from '@/Components/PostCard';
import Vote from '@/Components/Vote';
import { PostProps, PostProvider } from '@/Contexts/PostContext';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { useForm, usePage } from '@inertiajs/react';
import { ChangeEvent, useState } from 'react';
import CommentForm from '../Comment/CommentForm';
import CommentList from '../Comment/CommentList';
import EditPost from './Edit';

export default function PostView() {
    const { post, comments, can } = usePage<PostProps>().props;

    const {
        patch,
        delete: destroy,
        setData,
        data,
    } = useForm({
        body: post.body,
    });

    const [editing, setEditing] = useState(false);

    const handleDelete = () => {
        destroy(route('post.destroy', { post: post.id }));
    };

    const handleSave = () => {
        patch(route('post.update', { post: post.id }), {
            onSuccess: () => setEditing(false),
        });
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData('body', e.target.value);
    };

    return (
        <DefaultLayout>
            <PostProvider>
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-row items-center justify-between">
                        <PostAuthorContext />
                        {can?.edit_post && (
                            <OptionsDropdown
                                onClickEdit={() => setEditing(true)}
                                onClickDelete={handleDelete}
                            />
                        )}
                    </div>
                    <div className="flex flex-col space-y-6">
                        <div className="text-2xl font-semibold">
                            {post.title}
                        </div>
                        {editing && can?.edit_post ? (
                            <EditPost
                                onChange={handleChange}
                                onSave={handleSave}
                                onCancel={() => setEditing(false)}
                                textAreaValue={data.body}
                            />
                        ) : (
                            <div className="whitespace-pre-line">
                                {post.body}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Vote
                            userVote={post.votes?.[0]}
                            voteSum={post.votes_sum_value}
                            voteableType="post"
                            voteableId={post.id}
                        />
                        <Comments commentCount={post.comments_count} />
                    </div>
                    <Break />
                    <CommentForm />
                    {comments && <CommentList comments={comments} />}
                </div>
            </PostProvider>
        </DefaultLayout>
    );
}

interface OptionsDropdownProps {
    onClickEdit: () => void;
    onClickDelete: () => void;
}

export const OptionsDropdown = ({
    onClickEdit,
    onClickDelete,
}: OptionsDropdownProps) => {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <div className="hover:bg-reddit-dark-secondary cursor-pointer rounded-full p-2">
                    <svg
                        fill="currentColor"
                        height="16"
                        viewBox="0 0 20 20"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M6 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path>
                    </svg>
                </div>
            </Dropdown.Trigger>
            <Dropdown.Content width="24">
                <button
                    className="flex w-full cursor-pointer flex-row items-center space-x-2 rounded-2xl px-4 py-2.5"
                    onClick={onClickEdit}
                >
                    <svg
                        fill="currentColor"
                        height="20"
                        viewBox="0 0 20 20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m18.236 3.158-1.4-1.4a2.615 2.615 0 0 0-3.667-.021L1.336 13.318a1.129 1.129 0 0 0-.336.8v3.757A1.122 1.122 0 0 0 2.121 19h3.757a1.131 1.131 0 0 0 .8-.337L18.256 6.826a2.616 2.616 0 0 0-.02-3.668ZM5.824 17.747H2.25v-3.574l9.644-9.435L15.259 8.1l-9.435 9.647ZM17.363 5.952l-1.23 1.257-3.345-3.345 1.257-1.23a1.362 1.362 0 0 1 1.91.01l1.4 1.4a1.364 1.364 0 0 1 .008 1.908Z"></path>
                    </svg>
                    <p>Edit</p>
                </button>
                <button
                    className="flex w-full cursor-pointer flex-row items-center space-x-2 rounded-2xl px-4 py-2.5"
                    onClick={onClickDelete}
                >
                    <svg
                        fill="currentColor"
                        height="20"
                        viewBox="0 0 20 20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M15.751 6.023 17 6.106l-.761 11.368a2.554 2.554 0 0 1-.718 1.741A2.586 2.586 0 0 1 13.8 20H6.2a2.585 2.585 0 0 1-1.718-.783 2.553 2.553 0 0 1-.719-1.737L3 6.106l1.248-.083.761 11.369c-.005.333.114.656.333.908.22.252.525.415.858.458h7.6c.333-.043.64-.207.859-.46.22-.254.338-.578.332-.912l.76-11.363ZM18 2.983v1.243H2V2.983h4v-.372A2.737 2.737 0 0 1 6.896.718 2.772 2.772 0 0 1 8.875.002h2.25c.729-.03 1.44.227 1.979.716.538.488.86 1.169.896 1.893v.372h4Zm-10.75 0h5.5v-.372a1.505 1.505 0 0 0-.531-1.014 1.524 1.524 0 0 0-1.094-.352h-2.25c-.397-.03-.79.097-1.094.352-.304.256-.495.62-.531 1.014v.372Z"></path>
                    </svg>
                    <p>Delete</p>
                </button>
            </Dropdown.Content>
        </Dropdown>
    );
};
