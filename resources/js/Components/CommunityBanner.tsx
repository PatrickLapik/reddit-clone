
export default function CommunityBanner({ ...props }) {
    return (
        <div className="relative w-full mb-20">
            <img
                className="h-44 min-w-full rounded-xl object-cover"
                src="https://www.guardianoffshore.com.au/wp-content/uploads/2015/03/banner-placeholder.jpg"
            />
            <img
                className="border-reddit-dark absolute top-32 left-10 h-28 w-28 rounded-full border-5"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s"
            />
            <h1 className="absolute top-48 left-40 text-4xl font-bold">
                r/{props.title}
            </h1>
        </div>
    );
}
