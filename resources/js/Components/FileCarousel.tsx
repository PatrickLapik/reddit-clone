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
                    <CarouselNext className='bg-reddit-dark opacity-50' />
                    <CarouselPrevious className='bg-reddit-dark opacity-50' />
                </>
            )}
        </Carousel>
    );
}

function ImageView({ path }: { path: string }) {
    return (
        <div className="flex h-full w-full justify-center overflow-hidden rounded-3xl">
            <div className="relative flex w-full items-center justify-center max-h-[40vh]">
                <img
                    className="absolute top-0 left-0 h-full w-full scale-110 object-cover blur-3xl"
                    src={path}
                    alt="Background"
                />
                <img
                    className="relative z-10 object-contain h-full"
                    src={path}
                    alt="Main"
                />
            </div>
        </div>
    );
}
