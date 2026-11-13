import { ImageIcon } from "lucide-react";
import { Diagram } from "~/components/diagrams";
import type { ProjectMeta } from "~/lib/content.server";
import { cn } from "~/lib/utils";

/**
 * The visual for a project: its screenshot, else its diagram, else (for featured
 * projects) a placeholder. `full` is the case-study page, `compact` the home card.
 */
export function Screenshot({
  project,
  className,
  variant = "compact",
}: {
  project: ProjectMeta;
  className?: string;
  variant?: "compact" | "full";
}) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.imageAlt ?? ""}
        loading="lazy"
        className={cn(
          "bg-muted w-full rounded-lg border",
          variant === "compact" && "object-cover object-top",
          className,
        )}
      />
    );
  }
  if (project.diagram) {
    if (variant === "full") return <Diagram name={project.diagram} variant="full" />;
    return (
      <div className={cn("bg-muted/30 flex items-center justify-center rounded-lg border p-3", className)}>
        <Diagram name={project.diagram} variant="compact" />
      </div>
    );
  }
  if (!project.featured || !project.placeholder) return null;
  return (
    <div
      role="img"
      aria-label={`Screenshot of ${project.title} coming soon`}
      className={cn(
        "bg-muted/50 text-muted-foreground flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-sm",
        variant === "full" && "aspect-[16/9]",
        className,
      )}
    >
      <ImageIcon className="size-6" aria-hidden="true" />
      Screenshot coming soon
    </div>
  );
}
