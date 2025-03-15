import type { Media } from '@/Contexts/PostContext';
import { useState } from 'react';
import Modal from './Modal';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './Ui/carousel';

interface FileCarouselProps {
    media: Media[];
    onItemClick?: (index: number) => void;
    startIndex?: number;
    className?: string;
}

export function FileCarouselWithImagePreview({ media }: FileCarouselProps) {
    const [imageEnlarged, setImageEnlarged] = useState(false);
    const [modalStartIndex, setModalStartIndex] = useState(0);

    const handleImageEnlargment = (index: number) => {
        setModalStartIndex(index);
        setImageEnlarged(true);
    };

    return (
        <>
            <FileCarousel
                media={media}
                className="h-[512px]"
                onItemClick={handleImageEnlargment}
            />
            <EnlargedImagePreview
                onClose={() => setImageEnlarged(false)}
                show={imageEnlarged}
                media={media}
                startIndex={modalStartIndex}
            />
        </>
    );
}

export function FileCarousel({
    media,
    startIndex = 0,
    className,
    onItemClick,
}: FileCarouselProps) {
    return (
        <Carousel opts={{ startIndex: startIndex }}>
            <CarouselContent className={className}>
                {media.map((item, i) => (
                    <CarouselItem
                        key={i}
                        onClick={onItemClick ? () => onItemClick(i) : undefined}
                    >
                        <ImageView path={item.path} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            {media.length > 1 && (
                <>
                    <CarouselNext className="bg-reddit-dark opacity-50" />
                    <CarouselPrevious className="bg-reddit-dark opacity-50" />
                </>
            )}
        </Carousel>
    );
}

function ImageView({ path }: { path: string }) {
    return (
        <div className="flex h-full w-full justify-center overflow-hidden rounded-3xl">
            <div className="relative flex w-full items-center justify-center">
                <img
                    className="absolute top-0 left-0 h-full w-full scale-110 object-cover blur-3xl"
                    src={path}
                    alt="Background"
                />
                <img
                    className="relative z-10 h-full object-contain"
                    src={path}
                    alt="Main"
                />
            </div>
        </div>
    );
}

interface EnlargedImagePreviewProps extends FileCarouselProps {
    onClose: () => void;
    show: boolean;
}

export function EnlargedImagePreview({
    media,
    startIndex,
    show,
    onClose,
}: EnlargedImagePreviewProps) {
    return (
        <Modal className='h-screen w-full' show={show} maxWidth="full" onClose={onClose}>
            <FileCarousel
                media={media}
                startIndex={startIndex}
                className="h-screen w-screen"
            />
            <button onClick={onClose} className='rounded-full bg-reddit-dark opacity-80 absolute top-4 border border-reddit-border right-8 h-10 w-10'>X</button>
        </Modal>
    );
}
