import { UI_COPY } from "@/presentation/copy";
export function WatchButton(_props: {crn: string; scope: string}) {
 return <span className="text-xs text-ink-faint">{UI_COPY.workspace_watch_unavailable}</span>;
}
