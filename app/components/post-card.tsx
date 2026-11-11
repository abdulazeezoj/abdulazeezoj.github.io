import { Link } from "react-router";
import type { PostMeta } from "~/lib/content.server";
import { formatDate } from "~/lib/format";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group hover:bg-accent/60 focus-visible:ring-ring -mx-3 block rounded-lg px-3 py-4 transition-colors focus-visible:ring-2 focus-visible:outline-none"
    >
      <div className="text-muted-foreground text-sm">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {" · "}
        {post.readingMinutes} min read
      </div>
      <h3 className="group-hover:text-brand mt-1 font-medium tracking-tight">
        {post.title}
      </h3>
      <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
        {post.summary}
      </p>
    </Link>
  );
}
