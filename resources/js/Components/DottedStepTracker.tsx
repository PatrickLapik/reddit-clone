interface StepTrackerProps {
    total: number;
    active: number;
    className?: string;
}

export default function DottedStepTracker({
    total,
    active,
    className,
}: StepTrackerProps) {
    const elements = [];

    for (let i = 1; i <= total; i++) {
        elements.push(
            <div
                key={i}
                className={`h-1 w-1 rounded-full ${active == i ? 'bg-white' : 'bg-reddit-border'}`}
            ></div>,
        );
    }
    return (
        <div
            className={`flex h-full flex-row items-center space-x-1 ${className}`}
        >
            {elements}
        </div>
    );
}
