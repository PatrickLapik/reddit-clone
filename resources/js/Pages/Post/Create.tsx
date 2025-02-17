import CommunitySelector from '@/Components/CommunitySelector';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { TabSelectorSpa, TabSpa } from '@/Components/TabSelector';
import TextInput from '@/Components/TextInput';
import { UserProps } from '@/Contexts/UserContext';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

const tabs: TabSpa[] = [
    { key: 'text', label: 'Text' },
    { key: 'image', label: 'Image' },
];

export default function CreatePost() {
    const { post, setData } = useForm({
        title: '',
        body: '',
        files: [] as File[],
        community_id: 0,
    });

    const { joinedCommunities } = usePage<UserProps>().props.auth;

    const handleSubmit = () => {
        post(route('post.create'));
    };

    return (
        <DefaultLayout header="Create post">
            <Head title="Create post" />
            <form
                className="mt-6 flex flex-col space-y-8"
                encType="multipart/form-data"
            >
                <CommunitySelector
                    communities={joinedCommunities}
                    onSelect={(id) => setData('community_id', id)}
                />
                <TabSelectorSpa
                    tabs={tabs}
                    children={{
                        text: <TextForm setData={setData} />,
                        image: <ImageForm setData={setData} />,
                    }}
                />
            </form>
            <div className="mt-3 flex w-full justify-end">
                <PrimaryButton onClick={handleSubmit}>Post</PrimaryButton>
            </div>
        </DefaultLayout>
    );
}

interface FormProps {
    setData: (key: string, value: string | File[]) => void;
}

function TextForm({ setData }: FormProps) {
    return (
        <div className="flex-col space-y-8">
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
                    className="h-40"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData('body', e.target.value)
                    }
                />
            </div>
        </div>
    );
}

function ImageForm({ setData }: FormProps) {
    return (
        <div className="flex-col space-y-8">
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
                <input
                    className="border-reddit-border flex h-24 w-full rounded-2xl border border-dashed px-2 py-2.5"
                    type="file"
                    multiple
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setData(
                            'files',
                            e.target.files ? Array.from(e.target.files) : [],
                        )
                    }
                />
            </div>
        </div>
    );
}
