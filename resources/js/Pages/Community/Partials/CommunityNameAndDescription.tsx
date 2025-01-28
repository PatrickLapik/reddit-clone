import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

interface CommunityNameAndDescriptionProps {
    className?: string;
    setData: (key: string, value: any) => void;
    data: { name: string; description: string };
}

export default function CommunityNameAndDescription({
    className,
    setData,
    data,
}: CommunityNameAndDescriptionProps) {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setData(e.target.id, e.target.value);
    };

    return (
        <section className={className}>
            <header className="flex flex-col items-start">
                <div className="text-lg font-semibold text-gray-100">
                    What should your community be about?
                </div>
                <div className="text-gray-300">
                    A name and description to help people understand what's the
                    community about.
                </div>
            </header>
            <form className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Community name" />
                    <TextInput
                        id="name"
                        name="name"
                        className="mt-1"
                        onChange={handleChange}
                        value={data.name}
                    />
                </div>
                <div>
                    <InputLabel htmlFor="description" value="Description" />
                    <TextInput
                        id="description"
                        name="name"
                        className="mt-1 min-h-40 resize-none"
                        as="textarea"
                        onChange={handleChange}
                        value={data.description}
                    />
                </div>
            </form>
        </section>
    );
}
