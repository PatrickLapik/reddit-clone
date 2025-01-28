import React from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FileUpload from '@/Components/FileUpload';


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
        id="avatar-upload"
        onFileSelect={handleFileSelect}
        containerClassName="border-dashed border border-gray-300 rounded-3xl py-5 w-full"
        previewClassName="h-48 w-48 rounded-full border-2"
        noImageClassName='h-48 w-48 rounded-full'
        label="No Image"
      />

      <InputError message={errors.avatar} className="w-full text-center" />

      <PrimaryButton disabled={processing} type="submit">
        Upload Avatar
      </PrimaryButton>
    </form>
  );
};

export default AvatarUploadForm;

