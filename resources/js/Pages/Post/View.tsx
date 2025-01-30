import Break from '@/Components/Break';
import { PostAuthorContext } from '@/Components/PostAuthor';
import { PostProps, PostProvider } from '@/Contexts/PostContext';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { usePage } from '@inertiajs/react';

export default function PostView() {
    const { post, author } = usePage<PostProps>().props;

    return (
        <DefaultLayout>
            <PostProvider>
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-row items-center space-x-2">
                        <img
                            className="aspect-square h-10 rounded-full"
                            src={author.avatar}
                        />
                        <PostAuthorContext />
                    </div>
                    <div className="flex flex-col space-y-6">
                        <div className="text-2xl font-semibold">
                            {post.title}
                        </div>
                        <div>{post.body}</div>
                    </div>
                    <Break />
                </div>
            </PostProvider>
        </DefaultLayout>
    );
}
