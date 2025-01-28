import React, { useState } from 'react';

interface FileUploadProps {
    id: string;
    onFileSelect?: (file: File) => void;
    containerClassName?: string;
    previewClassName?: string;
    noImageClassName?: string;
    label?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
    id,
    onFileSelect,
    containerClassName = '',
    previewClassName = '',
    noImageClassName = '',
    label = 'No Image',
}) => {
    const [preview, setPreview] = useState<string | null>(null);

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            try {
                const base64String = await convertFileToBase64(file);
                setPreview(base64String);
                if (onFileSelect) {
                    onFileSelect(file);
                }
            } catch (error) {
                console.error('Error converting file to Base64:', error);
            }
        }
    };

    return (
        <div className={`flex justify-center ${containerClassName}`}>
            <label htmlFor={id} className="cursor-pointer">
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className={`object-cover ${previewClassName}`}
                    />
                ) : (
                    <div className={`flex items-center justify-center bg-gray-200 text-gray-500 ${noImageClassName}`}>
                        {label}
                    </div>
                )}
            </label>
            <input
                type="file"
                id={id}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default FileUpload;
