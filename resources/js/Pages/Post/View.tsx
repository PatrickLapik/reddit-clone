import Break from '@/Components/Break';
import { PostAuthorContext } from '@/Components/PostAuthor';
import Vote from '@/Components/Vote';
import { PostProps, PostProvider } from '@/Contexts/PostContext';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { usePage } from '@inertiajs/react';

export default function PostView() {
    const { post } = usePage<PostProps>().props;

    return (
        <DefaultLayout>
            <PostProvider>
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-row items-center space-x-2">

                        <PostAuthorContext />
                    </div>
                    <div className="flex flex-col space-y-6">
                        <div className="text-2xl font-semibold">
                            {post.title}
                        </div>
                        <div>{post.body}</div>
                    </div>
                    <Vote postData={post}/>
                    <Break />
                </div>
            </PostProvider>
        </DefaultLayout>
    );
}
