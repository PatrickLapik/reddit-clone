import type { Media } from '@/Contexts/PostContext';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './Ui/carousel';

interface FileCarouselProps {
    media: Media[];
}

export function FileCarousel({ media }: FileCarouselProps) {
    return (
        <Carousel>
            <CarouselContent>
                {media.map((item) => (
                    <CarouselItem key={item.id}>
                        <ImageView path={item.path} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            {media.length > 1 && (
                <>
                    <CarouselNext />
                    <CarouselPrevious />
                </>
            )}
        </Carousel>
    );
}

function ImageView({ path }: { path: string }) {
    return (
        <div className="flex h-full w-full justify-center overflow-hidden rounded-3xl">
            <div className="relative flex h-full w-full items-center justify-center">
                <img
                    className="absolute top-0 left-0 h-full w-full scale-110 object-cover blur-3xl"
                    src={path}
                    alt="Background"
                />
                <img
                    className="relative z-10 max-h-[40vh] object-contain"
                    src={path}
                    alt="Main"
                />
            </div>
        </div>
    );
}

function CarouselButton() {
    return (
        <button className="bg-reddit-dark hover:bg-reddit-border-secondary flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2 opacity-45">
            <svg
                height="16"
                className="fill-white opacity-100"
                icon-name="right-fill"
                viewBox="0 0 20 20"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="m7.207 19.707-1.414-1.414L14.086 10 5.793 1.707 7.207.293l9 9a1 1 0 0 1 0 1.414l-9 9Z"></path>
            </svg>
        </button>
    );
}
