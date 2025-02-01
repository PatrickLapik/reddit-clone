import Break from '@/Components/Break';
import PostCard from '@/Components/PostCard';
import { UserProps } from '@/Contexts/UserContext';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Home() {
    const { posts } = usePage<UserProps>().props;
    return (
        <DefaultLayout>
            <Head title="Shiddit - Dive into anything" />
            {posts?.map((post) => (
                <>
                    <PostCard
                        post={post}
                        author={post.user}
                        href={route('post.show', {
                            name: post.user.name,
                            post: post.id,
                        })}
                    />
                    <Break/>
                </>
            ))}
        </DefaultLayout>
    );
}
