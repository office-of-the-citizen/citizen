/**
 * Participation source — client-side fetch wrapper for participation APIs.
 *
 * Mirrors the server-side ProjectionSource pattern but lives in the browser.
 * Talks to the same Engine 12 Gateway for participation capabilities.
 * Never imports CAOS internals.
 */
import type {
  ParticipationCase,
  ParticipationTimeline,
  Question,
  FOIRequest,
  DemandInfo,
  WatchResult,
  CreateQuestionParams,
  CreateFOIRequestParams,
} from "@office-of-the-citizen/caos-sdk";

export interface ParticipationSource {
  createQuestion(params: CreateQuestionParams): Promise<Question>;
  createFOIRequest(params: CreateFOIRequestParams): Promise<FOIRequest>;
  getCase(participationId: string): Promise<ParticipationCase>;
  getCaseTimeline(participationId: string): Promise<ParticipationTimeline>;
  getDemand(subjectRef: string): Promise<DemandInfo>;
  watchObject(crn: string, scope: string): Promise<WatchResult>;
  removeWatch(watchId: string): Promise<void>;
}

function gatewayUrl(): string {
  return (
    process.env.NEXT_PUBLIC_CAOS_GATEWAY_URL?.replace(/\/$/, "") ??
    "http://localhost:4000"
  );
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${gatewayUrl()}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`Participation API error: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  return (json.data ?? json) as T;
}

export function participationSource(): ParticipationSource {
  return {
    async createQuestion(params) {
      return api<Question>("/api/v1/participation", {
        method: "POST",
        body: JSON.stringify({ participation_type: "QUESTION", ...params }),
      });
    },

    async createFOIRequest(params) {
      return api<FOIRequest>("/api/v1/services/foi/request", {
        method: "POST",
        body: JSON.stringify(params),
      });
    },

    async getCase(participationId) {
      return api<ParticipationCase>(`/api/v1/participation/${participationId}`);
    },

    async getCaseTimeline(participationId) {
      return api<ParticipationTimeline>(
        `/api/v1/participation/${participationId}/timeline`,
      );
    },

    async getDemand(subjectRef) {
      return api<DemandInfo>(
        `/api/v1/participation/demand/${encodeURIComponent(subjectRef)}`,
      );
    },

    async watchObject(crn, scope) {
      return api<WatchResult>("/api/v1/participation/watch", {
        method: "POST",
        body: JSON.stringify({ crn, scope }),
      });
    },

    async removeWatch(watchId) {
      await fetch(`${gatewayUrl()}/api/v1/participation/watch/${watchId}`, {
        method: "DELETE",
      });
    },
  };
}
