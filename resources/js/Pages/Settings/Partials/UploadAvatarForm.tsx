import FileUpload from '@/Components/FileUpload';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import React from 'react';

interface ChildProps {
    setState: React.Dispatch<React.SetStateAction<'uploadAvatar' | null>>;
}

const AvatarUploadForm: React.FC<ChildProps> = ({ setState }) => {
    const { post, setData, errors, processing } = useForm({
        avatar: null as File | null,
    });

    const handleFileSelect = (file: File) => {
        setData('avatar', file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('settings.profile.update'), {
            onFinish: () => setState(null),
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col items-end space-y-4"
        >
            <FileUpload
                id={'avatar'}
                onFileSelect={handleFileSelect}
                containerClassName="border-dashed border border-gray-300 rounded-3xl py-5 w-full space-x-2"
            >
                <FileUpload.Label
                    htmlFor="avatar"
                    className="flex h-48 w-full items-center justify-center rounded-full"
                ></FileUpload.Label>

                <FileUpload.Preview
                    label="Cool preview"
                    className="h-48 w-48 rounded-full border-2 absolute"
                    noImageClassName="h-48 w-48 rounded-full absolute"
                ></FileUpload.Preview>
            </FileUpload>

            <InputError
                message={errors.avatar}
                className="w-full text-center"
            />

            <PrimaryButton disabled={processing} type="submit">
                Upload Avatar
            </PrimaryButton>
        </form>
    );
};

export default AvatarUploadForm;
