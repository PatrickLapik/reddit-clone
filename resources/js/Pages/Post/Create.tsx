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
    const { post, setData, data } = useForm({
        title: '',
        body: '',
        files: [] as File[],
        community_id: 0,
    });

    console.log(data.title)

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
                        text: (
                            <TextForm
                                onChange={({ name, value }: UserFormName) =>
                                    setData(name, value)
                                }
                                data={data}
                            />
                        ),
                        image: (
                            <ImageForm
                                onChange={({ name, value }: UserFormName) =>
                                    setData(name, value)
                                }
                                data={data}
                            />
                        ),
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
    onChange: ({ name, value }: UserFormName) => void;
    data: FormData;
}

interface FormData {
    title: string;
    body: string;
    files: File[];
    community_id: number;
}

interface UserFormName {
    name: 'title' | 'body' | 'files' | 'community_id';
    value: any;
}

function TextForm({ onChange, data }: FormProps) {
    const handleChange = ({ name, value }: UserFormName) => {
        onChange({ name, value: value });
    };
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
                        handleChange({ name: 'title', value: e.target.value })
                    }
                    value={data.title}
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
                        handleChange({ name: 'body', value: e.target.value })
                    }
                    value={data.body}
                />
            </div>
        </div>
    );
}

function ImageForm({ onChange, data }: FormProps) {
    const handleChange = ({ name, value }: UserFormName) => {
        onChange({ name, value: value });
    };
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
                        handleChange({ name: 'title', value: e.target.value })
                    }
                    value={data.title}
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
                        handleChange({ name: 'body', value: e.target.value })
                    }
                    value={data.body}
                />
            </div>
            <div>
                <input
                    className="border-reddit-border flex h-24 w-full rounded-2xl border border-dashed px-2 py-2.5"
                    type="file"
                    multiple
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange({
                            name: 'files',
                            value: e.target.files
                                ? Array.from(e.target.files)
                                : [],
                        })
                    }
                />
            </div>
        </div>
    );
}
