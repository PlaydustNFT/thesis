export declare class Author {
    name?: string;
    socialMediaHandles?: Map<string, string>;
    photo?: Uint8Array;
}
export declare class Comment {
    /**
     * The time at which this comment was posted
     */
    timestamp?: Date;
    /**
     * Whether this comment has been approved by a moderator.
     */
    approved?: boolean;
    /**
     * The title of the comment
     */
    subject?: string;
    /**
     * The text of the comment
     */
    text?: string;
    /**
     * The handle of the comment author
     */
    author?: string;
    /**
     * The number of upvotes this comment has received.
     */
    upvotes?: number;
    /**
     * The number of downvotes this comment has received.
     */
    downvotes?: number;
    /**
     * Replies to this comment
     */
    replies?: Array<Comment>;
}
export declare class Post {
    id?: string;
    createdAt?: Date;
    version?: number;
    author?: Author;
    content?: string;
    title?: string;
    subtitle?: string;
    imageLink?: string;
    corrections?: Array<string>;
    /**
     * Replies to this post
     */
    replies?: Array<Comment>;
    tags?: Set<string>;
}
