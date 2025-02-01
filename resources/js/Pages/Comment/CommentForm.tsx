import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { usePost } from '@/Contexts/PostContext';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface CommentFormProps {
    parentComment?: number;
    onSubmit?: () => void;
}

export default function CommentForm({
    parentComment,
    onSubmit,
}: CommentFormProps) {
    const postId = usePost().post.id;

    const { post, setData, reset, data, errors } = useForm({
        body: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (onSubmit) {
            onSubmit();
        }

        post(route('comment.store', { post: postId, comment: parentComment }), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col justify-center border-reddit-border border py-2.5 rounded-3xl text-sm"
        >
            <TextInput
                as="textarea"
                id="body"
                value={data.body}
                placeholder="Add comment"
                className="border-reddit-border bg-transparent text-sm min-h-8 focus:ring-transparent focus:border-none"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setData('body', e.target.value)
                }
            >

            </TextInput>
            <InputError message={errors.body} />
            <div className="mt-3 flex w-full items-center justify-end px-4">
                <PrimaryButton type="submit">Comment</PrimaryButton>
            </div>
        </form>
    );
}
