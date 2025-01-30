interface BreakProps {
    className?: string;
}

export default function Break({ className }: BreakProps) {
    return <hr className={`border-reddit-border-secondary my-3 ${className}`} />;
}
