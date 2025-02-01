import Break from '@/Components/Break';
import { PostAuthorContext } from '@/Components/PostAuthor';
import { Comments } from '@/Components/PostCard';
import Vote from '@/Components/Vote';
import { PostProps, PostProvider } from '@/Contexts/PostContext';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { usePage } from '@inertiajs/react';
import CommentForm from '../Comment/CommentForm';
import CommentList from '../Comment/CommentList';

export default function PostView() {
    const { post, comments } = usePage<PostProps>().props;

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
                        <div className="whitespace-pre-line">{post.body}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Vote
                            userVote={post.votes?.[0]}
                            voteSum={post.votes_sum_value}
                            voteableType="post"
                            voteableId={post.id}
                        />
                        <Comments commentCount={post.comments_count} />
                    </div>
                    <Break />
                    <CommentForm />
                    {comments && <CommentList comments={comments} />}
                </div>
            </PostProvider>
        </DefaultLayout>
    );
}
