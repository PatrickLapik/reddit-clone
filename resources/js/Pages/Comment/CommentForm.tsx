import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Post } from '@/Contexts/PostContext';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface CommentFormProps {
    postData: Post;
}

export default function CommentForm({ postData }: CommentFormProps) {
    const { post, setData, reset, data } = useForm({
        body: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('comment.store', { post: postData.id }), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col justify-center"
        >
            <TextInput
                as="textarea"
                id="body"
                value={data.body}
                placeholder="Add comment"
                className="border-reddit-border bg-transparent"
                addBorder={true}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setData('body', e.target.value)
                }
            />
            <InputError />
            <div className="mt-3 flex w-full items-center justify-end">
                <PrimaryButton type="submit">Comment</PrimaryButton>
            </div>
        </form>
    );
}
