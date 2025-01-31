import CommunitySelector from '@/Components/CommunitySelector';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { UserProps } from '@/Contexts/UserContext';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function CreatePost() {
    const { post, setData } = useForm({
        title: '',
        body: '',
        community_id: 0,
    });

    const { joinedCommunities } = usePage<UserProps>().props.auth;

    const handleSubmit = () => {
        post(route('post.create'));
    };

    return (
        <DefaultLayout header="Create post">
            <Head title='Create post' />
            <form className="mt-6 flex flex-col space-y-8">
                <CommunitySelector
                    communities={joinedCommunities}
                    onSelect={(id) => setData('community_id', id)}
                />
                <div>
                    <InputLabel htmlFor="title" className="text-lg">
                        <span>Title</span>
                        <span className="text-red-600">*</span>
                    </InputLabel>
                    <TextInput
                        id="title"
                        name="title"
                        className="h-14"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData('title', e.target.value)
                        }
                    />
                </div>
                <div>
                    <InputLabel htmlFor="body" className="text-lg">
                        <span>Body</span>
                    </InputLabel>
                    <TextInput
                        id="body"
                        name="body"
                        as="textarea"
                        className="h-40 resize-none"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setData('body', e.target.value)
                        }
                    />
                </div>
            </form>
            <div className="mt-3 flex w-full justify-end">
                <PrimaryButton onClick={handleSubmit}>Post</PrimaryButton>
            </div>
        </DefaultLayout>
    );
}
