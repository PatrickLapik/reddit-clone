import FileUpload from '@/Components/FileUpload';

interface CommunityBannerAndIcon {
    className?: string;
    setData: (key: string, value: any) => void;
    data: { name: string; description: string };
}

export default function CommunityBannerAndIcon({
    className,
    setData,
    data,
}: CommunityBannerAndIcon) {
    return (
        <section className={className}>
            <header className="flex flex-col items-start">
                <div className="text-lg font-semibold text-gray-100">
                    Give this community some pizzazz
                </div>
                <div className="text-gray-300">
                    Stand out with your community by displaying interesting
                    visuals.
                </div>
            </header>
            <form className="mt-6 w-full space-y-6 items-start">
                <FileUpload
                    id={'banner'}
                    noImageClassName="rounded-full h-24 w-96"
                    containerClassName="rounded-full h-24 w-96"
                    previewClassName='rounded-full h-24 w-96'
                />
                <FileUpload
                    id={'icon'}
                    noImageClassName="rounded-full h-24 w-24"
                    containerClassName="rounded-full h-24 w-24"
                    previewClassName='rounded-full h-24 w-24'
                />
            </form>
        </section>
    );
}
