import { cn } from "@/lib/cn";

/**
 * The one card surface. Every raised panel in the application composes this
 * primitive so radius, elevation and rhythm stay consistent.
 */
export function Card({
  children,
  className,
  as: Tag = "div",
  ...rest
}: React.HTMLAttributes<HTMLElement> & {
  as?: "div" | "section" | "article";
}) {
  return (
    <Tag className={cn("rounded-card bg-surface p-4 shadow-card", className)} {...rest}>
      {children}
    </Tag>
  );
}
