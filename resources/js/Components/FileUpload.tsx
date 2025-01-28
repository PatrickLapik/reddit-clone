import React, { useState } from 'react';

export const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

interface FileUploadProps {
    id: string;
    onFileSelect?: (file: File) => void;
    containerClassName?: string;
    children?: React.ReactNode;
}

interface FileUploadPreviewProps {
    preview?: string | null;
    className?: string;
    noImageClassName?: string;
    label?: string;
}

interface FileUploadLabelProps {
    htmlFor: string;
    children?: React.ReactNode;
    className?: string;
}

interface FileUploadChildProps {
    preview?: string | null;
    id: string;
}

const FileUpload: React.FC<FileUploadProps> & {
    Preview: React.FC<FileUploadPreviewProps>;
    Label: React.FC<FileUploadLabelProps>;
} = ({ id, onFileSelect, containerClassName = '', children }) => {
    const [preview, setPreview] = useState<string | null>(null);

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
            <input
                type="file"
                id={id}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
            {React.Children.map(children, (child) => {
                if (React.isValidElement<FileUploadChildProps>(child)) {
                    return React.cloneElement(child, { preview, id });
                }
                return child;
            })}
        </div>
    );
};

FileUpload.Preview = ({
    preview,
    className = '',
    noImageClassName = '',
    label = 'No Image',
}: FileUploadPreviewProps) => {
    return preview ? (
        <img
            src={preview}
            alt="Preview"
            className={`object-cover ${className}`}
        />
    ) : (
        <div
            className={`flex items-center justify-center bg-gray-200 text-gray-500 ${noImageClassName}`}
        >
            {label}
        </div>
    );
};

FileUpload.Label = ({ htmlFor, children, className }: FileUploadLabelProps) => {
    return (
        <label htmlFor={htmlFor} className={`cursor-pointer ${className}`}>
            {children}
        </label>
    );
};

export default FileUpload;
