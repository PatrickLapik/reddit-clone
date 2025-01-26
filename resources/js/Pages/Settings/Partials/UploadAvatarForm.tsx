import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';

const AvatarUploadForm: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { post, setData, data, errors, processing, recentlySuccessful } =
        useForm({
            avatar: null as File | null,
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(data.avatar);

        post(route('settings.profile.update'));
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
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setData('avatar', e.target.files[0]);
                        }
                    }}
                    className="hidden"
                />
            </div>

            <InputError
                message={errors.avatar}
                className="w-full text-center"
            />
            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <p className="text-sm text-green-600 text-center w-full" >Success! New avatar uploaded!</p>
            </Transition>

            <PrimaryButton disabled={processing} type="submit">
                Upload Avatar
            </PrimaryButton>
        </form>
    );
};

export default AvatarUploadForm;
