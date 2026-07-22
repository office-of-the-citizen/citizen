"use client";

/**
 * CaseTracker — timeline and lifecycle of a participation case.
 *
 * Shows the governed progress of a question, FOI request, or challenge.
 * Active cases display a clock countdown; completed cases show their
 * outcome. Teaches civic process at each lifecycle transition.
 */
import { useState, useEffect } from "react";
import type {
  ParticipationCase,
  ParticipationTimeline,
  TimelineEvent,
} from "@office-of-the-citizen/caos-sdk";
import { participationSource } from "@/sdk/participation";
import { Icon } from "@/presentation/icons/Icon";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

interface CaseTrackerProps {
  participationId: string;
}

const LIFECYCLE_LABELS: Record<string, string> = {
  COMPOSED: "Drafting",
  IDENTIFIED: "Identified",
  CONSENTED: "Consented",
  FILED: "Filed",
  DISPATCHED: "Dispatched",
  DELIVERED: "Delivered",
  ACKNOWLEDGED: "Acknowledged",
  TRANSFERRED: "Transferred",
  CLARIFIED: "Clarified",
  RESPONDED: "Responded",
  SILENCE_RECORDED: "Silence recorded",
  ESCALATED: "Escalated",
  CLOSED: "Closed",
  WITHDRAWN: "Withdrawn",
};

const OUTCOME_LABELS: Record<string, string> = {
  RESPONDED_FULL: "Fully responded",
  RESPONDED_PARTIAL: "Partially responded",
  REFUSED: "Refused",
  DEEMED_REFUSED: "Deemed refused",
  WITHDRAWN: "Withdrawn",
  ESCALATED: "Escalated",
  RESOLVED: "Resolved",
  TRANSFERRED: "Transferred",
};

function formatTimestamp(ts: string): string {
  return new Date(ts).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ClockCountdown({ expiresAt }: { expiresAt: string }) {
  const [remaining, setRemaining] = useState<string>("");

  useEffect(() => {
    function update() {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) {
        setRemaining("Expired");
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      setRemaining(
        days > 0 ? `${days}d ${hours}h remaining` : `${hours}h ${mins}m remaining`,
      );
    }
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-status-pending">
      <Icon name="clock" size={13} />
      {remaining}
    </span>
  );
}

function TimelineEntry({ event }: { event: TimelineEvent }) {
  return (
    <div className="relative flex gap-3 pb-4">
      <div className="flex flex-col items-center">
        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        <span className="w-px flex-1 bg-line" />
      </div>
      <div className="min-w-0 pb-1">
        <p className="text-[13px] font-bold text-ink">{event.to_state.replace(/_/g, " ")}</p>
        <p className="text-[11px] text-ink-faint">{event.trigger}</p>
        <p className="text-[11px] text-ink-faint">{formatTimestamp(event.timestamp)}</p>
      </div>
    </div>
  );
}

export function CaseTracker({ participationId }: CaseTrackerProps) {
  const [kase, setCase] = useState<ParticipationCase | null>(null);
  const [timeline, setTimeline] = useState<ParticipationTimeline | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const source = participationSource();
    Promise.all([source.getCase(participationId), source.getCaseTimeline(participationId)])
      .then(([c, t]) => {
        if (!cancelled) { setCase(c); setTimeline(t); }
      })
      .catch(() => { if (!cancelled) setError(true); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [participationId]);

  if (loading) {
    return (
      <Card>
        <div className="flex items-center gap-2 py-3">
          <span className="h-4 w-4 animate-pulse rounded bg-ink-faint/30" />
          <span className="h-3 w-24 animate-pulse rounded bg-ink-faint/30" />
        </div>
      </Card>
    );
  }

  if (error || !kase) {
    return (
      <Card>
        <p className="text-[13px] text-ink-soft">
          Unable to load case details. Please try again later.
        </p>
      </Card>
    );
  }

  const lifecycleLabel = LIFECYCLE_LABELS[kase.lifecycle_state] ?? kase.lifecycle_state;
  const outcomeLabel = kase.outcome ? OUTCOME_LABELS[kase.outcome] ?? kase.outcome : null;

  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-label text-ink-faint">
            Case {participationId.slice(0, 8)}
          </p>
          <p className="mt-0.5 text-[15px] font-extrabold text-ink">{lifecycleLabel}</p>
          {outcomeLabel ? (
            <p className="mt-0.5 text-[12px] text-ink-soft">Outcome: {outcomeLabel}</p>
          ) : null}
        </div>
        <span
          className={cn(
            "rounded-chip px-2.5 py-1 text-[11px] font-bold",
            kase.lifecycle_state === "CLOSED" || kase.lifecycle_state === "WITHDRAWN"
              ? "bg-status-historical-soft text-status-historical"
              : "bg-status-pending-soft text-status-pending",
          )}
        >
          {kase.participation_type.replace(/_/g, " ")}
        </span>
      </div>

      {kase.filed_at && kase.lifecycle_state !== "CLOSED" ? (
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-surface-sunken px-3 py-2">
          <ClockCountdown
            expiresAt={
              new Date(new Date(kase.filed_at).getTime() + 14 * 86400000).toISOString()
            }
          />
          <span className="text-[11px] text-ink-faint">— statutory response period</span>
        </div>
      ) : null}

      {timeline && timeline.events.length > 0 ? (
        <div className="mt-4 border-t border-line pt-4">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-label text-ink-faint">
            Timeline
          </p>
          <div className="pl-1">
            {timeline.events.map((event, i) => (
              <TimelineEntry key={i} event={event} />
            ))}
          </div>
        </div>
      ) : null}

      <p className="mt-2 text-[11px] text-ink-faint">
        Filed {kase.filed_at ? formatTimestamp(kase.filed_at) : "not yet filed"}
      </p>
    </Card>
  );
}
