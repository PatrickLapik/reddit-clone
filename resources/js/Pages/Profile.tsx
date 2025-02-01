import Break from '@/Components/Break';
import PostCard from '@/Components/PostCard';
import { PostProvider } from '@/Contexts/PostContext';
import { UserProps } from '@/Contexts/UserContext';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Profile() {
    const { profile, posts } = usePage<UserProps>().props;
    return (
        <DefaultLayout>
            <PostProvider>
                <Head title={'u/' + profile?.name} />

                <div className="flex flex-row items-center space-x-2 py-12">
                    <img className="h-20 aspect-square object-cover rounded-full" src={profile?.avatar} />
                    <div className="text-2xl font-semibold">{'u/' + profile?.name}</div>
                </div>
                <div>
                    <Break />
                    {posts?.map((post) => (
                        <>
                            <PostCard
                                href={route('post.show', {
                                    post: post.id,
                                })}
                                key={post.id}
                                post={post}
                                author={profile}
                            />
                            <Break />
                        </>
                    ))}
                </div>
            </PostProvider>
        </DefaultLayout>
    );
}
