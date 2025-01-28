import FileUpload from '@/Components/FileUpload';

interface CommunityBannerAndIcon {
    className?: string;
    setData: (key: string, value: any) => void;
    data: {
        name: string;
        description: string;
        icon: string | null;
        banner: string | null;
    };
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
            <form className="mt-6 w-full items-start space-y-6">
                <FileUpload
                    id={'banner'}
                    onFileSelect={(file) => setData('banner', file)}
                >
                    <FileUpload.Label
                        htmlFor="banner"
                        className="bg-reddit-dark-secondary absolute top-25 left-6 h-18 w-42 rounded-xl p-2"
                    >
                        Upload a cool banner
                    </FileUpload.Label>
                    <FileUpload.Preview
                        noImageClassName="aspect-16/5 absolute right-6 top-25 h-24 rounded-xl"
                        className="absolute top-25 right-6 aspect-16/5 h-24 rounded-xl"
                        preview={data.banner}
                    ></FileUpload.Preview>
                </FileUpload>
                <FileUpload
                    id={'icon'}
                    onFileSelect={(file) => setData('icon', file)}
                >
                    <FileUpload.Label
                        htmlFor="icon"
                        className="bg-reddit-dark-secondary absolute bottom-35 left-6 h-18 w-42 rounded-xl p-2"
                    >
                        Upload an icon
                    </FileUpload.Label>
                    <FileUpload.Preview
                        noImageClassName="aspect-square h-24 rounded-full absolute right-52 bottom-34 border border-reddit-border z-30"
                        className="border-reddit-border absolute right-52 bottom-34 z-30 aspect-square h-24 rounded-full border"
                        preview={data.icon}
                    ></FileUpload.Preview>
                </FileUpload>
                {data.name && (
                    <div className="absolute right-6 bottom-42 w-44 font-semibold text-white">
                        r/{data.name}
                    </div>
                )}
            </form>
        </section>
    );
}
