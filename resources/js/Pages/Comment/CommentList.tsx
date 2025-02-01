import type { Comment } from '@/Contexts/CommentContext';
import CommentCard from './CommentCard';

interface CommentListProps {
    comments: Comment[];
    className?: string;
}

export default function CommentList({ comments, className }: CommentListProps) {
    return (
        <>
            {comments.map((comment) => (
                <div key={comment.id} className={className}>
                    <CommentCard comment={comment} />
                    {comment.replies.length > 0 && (
                        <CommentList className="ml-10" comments={comment.replies} />
                    )}
                </div>
            ))}
        </>
    );
}
