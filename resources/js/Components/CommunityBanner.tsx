interface CommunityBannerProps {
    name: string;
    icon: string;
    banner: string;
}


export default function CommunityBanner({name, icon, banner}: CommunityBannerProps) {
    return (
        <div className="relative w-full mb-20">
            <img
                className="h-44 min-w-full rounded-xl object-cover"
                src={banner}
            />
            <img
                className="border-reddit-dark absolute top-32 left-10 h-28 w-28 rounded-full border-5"
                src={icon}
            />
            <h1 className="absolute top-48 left-40 text-4xl font-bold">
                r/{name}
            </h1>
        </div>
    );
}
