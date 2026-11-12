import { ImageIcon } from "lucide-react";
import type { ProjectMeta } from "~/lib/content.server";
import { cn } from "~/lib/utils";

/** Shows the project's screenshot, or a placeholder for featured projects until one is added. */
export function Screenshot({ project, className }: { project: ProjectMeta; className?: string }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.imageAlt ?? ""}
        loading="lazy"
        className={cn("bg-muted w-full rounded-lg border object-cover object-top", className)}
      />
    );
  }
  if (!project.featured) return null;
  return (
    <div
      role="img"
      aria-label={`Screenshot of ${project.title} coming soon`}
      className={cn(
        "bg-muted/50 text-muted-foreground flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-sm",
        className,
      )}
    >
      <ImageIcon className="size-6" aria-hidden="true" />
      Screenshot coming soon
    </div>
  );
}
