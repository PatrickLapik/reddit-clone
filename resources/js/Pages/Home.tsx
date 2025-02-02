import Break from '@/Components/Break';
import InfiniteScrollObserver from '@/Components/InfiniteScrollObserver';
import PostCard from '@/Components/PostCard';
import { usePosts } from '@/Contexts/PostContext';
import { UserProps } from '@/Contexts/UserContext';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
    const { data, next_page_url } = usePage<UserProps>().props.paginated_posts;
    const { posts: allPosts, setPosts, nextPageUrl, setNextPageUrl } = usePosts();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (allPosts.length === 0) {
            setPosts(data);
            setNextPageUrl(next_page_url);
        }
    }, [data, setPosts, allPosts.length, setNextPageUrl]);

    const fetchMorePosts = async () => {
        if (!nextPageUrl && isLoading) return;

        setIsLoading(true);

        const response = await axios.get(nextPageUrl);
        const newPosts = response.data;

        setPosts((prev) => [...prev, ...newPosts.data]);
        setNextPageUrl(newPosts.next_page_url);

        setIsLoading(false);
    };
    return (
        <DefaultLayout>
            <Head title="Shiddit - Dive into anything" />
            {allPosts.map((post) => (
                <>
                    <PostCard
                        post={post}
                        author={post.user}
                        href={route('post.show', {
                            name: post.user.name,
                            post: post.id,
                        })}
                    />
                    <Break />
                </>
            ))}
            <InfiniteScrollObserver
                onVisible={fetchMorePosts}
                isLoading={isLoading}
                hasMore={!!next_page_url}
                rootMargin="50px"
            />
        </DefaultLayout>
    );
}
