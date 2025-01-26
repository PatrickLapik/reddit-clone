import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';

interface ChildProps {
  setState: React.Dispatch<React.SetStateAction<'uploadAvatar' | null>>;
}

const AvatarUploadForm: React.FC<ChildProps> = ({setState}) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { post, setData,  errors, processing} =
        useForm({
            avatar: null as File | null,
        });

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const fileDropped = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setData('avatar', file);
            convertFileToBase64(file)
                .then((base64String) => {
                    setImagePreview(base64String);
                })
                .catch((error) => {
                    console.error('Error converting file to base64:', error);
                });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('settings.profile.update'), {
            onFinish: () => setState(null)
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col items-end space-y-4"
        >
            <div className="border-reddit-dark-secondary flex w-full justify-center rounded-3xl border border-dashed py-5">
                <label htmlFor="avatar-upload" className="cursor-pointer">
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Avatar Preview"
                            className="border-reddit-dark-secondary h-48 w-48 rounded-full border-2 object-cover"
                        />
                    ) : (
                        <div className="border-reddit-dark-secondary flex h-48 w-48 items-center justify-center rounded-full border-2 bg-gray-200 text-gray-500">
                            No Image
                        </div>
                    )}
                </label>
                <input
                    type="file"
                    name="avatar"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={fileDropped}
                    className="hidden"
                />
            </div>

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
