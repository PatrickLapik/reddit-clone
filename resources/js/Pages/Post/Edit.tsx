import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { ChangeEvent } from 'react';

interface EditPostProps {
    onCancel: () => void;
    onSave: () => void;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    textAreaValue: string | undefined;
}

export default function EditPost({onSave, onCancel, onChange, textAreaValue}:EditPostProps) {
    return (
        <div className="flex flex-col space-y-3 rounded-2xl py-2 text-sm border border-reddit-border">
            <TextInput
                as="textarea"
                value={textAreaValue}
                onChange={onChange}
                className="border-reddit-border min-h-8 h-20 bg-transparent text-sm focus:border-none focus:ring-transparent"
            />
            <div className="flex flex-row space-x-2 justify-end px-4">
                <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
                <PrimaryButton onClick={onSave}>Save edit</PrimaryButton>
            </div>
        </div>
    );
}
