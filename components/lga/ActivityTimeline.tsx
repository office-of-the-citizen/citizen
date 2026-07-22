"use client";

import { motion } from "framer-motion";

import type { ActivityEntry, PublicRecord } from "@/sdk/contracts";
import { osIcon, osRole } from "@/presentation/os-visuals";
import { Icon } from "@/presentation/icons/Icon";
import { fadeRise } from "@/presentation/animations/motion";
import { formatDateShort } from "@/lib/format";
import {
  constitutionalDevelopments,
  type ConstitutionalDevelopment,
} from "@/presentation/updates/constitutional-developments";

/**
 * Latest Updates — the constitutional activity stream.
 *
 * Priority order:
 *   1. LOCAL NEWS — events specific to this local government that are
 *      not budget-related (projects, judgements, documents, etc.).
 *      The first slot is always reserved for local information. If
 *      nothing exists, the slot stays empty — never filled with
 *      national stories.
 *   2. BUDGET UPDATES — budget-related events specific to this local
 *      government (budget approvals, FAAC allocation changes). When
 *      no general local news exists, budget updates fill the first
 *      slot. Otherwise they appear in their own section below local
 *      news.
 *   3. CONSTITUTIONAL DEVELOPMENTS — nationally relevant developments
 *      affecting all 774 local governments. These are stable
 *      educational references (Supreme Court judgements, electoral
 *      reform, budget reform), always shown below local content.
 *      Projected NATIONAL-scoped activity entries take precedence and
 *      appear first within this section.
 *
 * Titles, categories, presentation and empty-state copy for projected
 * entries all arrive on the projection. The application authors no
 * editorial vocabulary for projected truth.
 */

const BUDGET_CATEGORIES = new Set([
  "BUDGET",
  "FAAC",
  "ALLOCATION",
  "REVENUE",
]);

function isBudgetCategory(category: string): boolean {
  return BUDGET_CATEGORIES.has(category.toUpperCase());
}

const CATEGORY_LABELS: Record<string, string> = {
  GOVERNANCE_REFORM: "Governance Reform",
  BUDGET_REFORM: "Budget Reform",
  ELECTORAL_REFORM: "Electoral Reform",
  JUDICIAL_REFORM: "Judicial Reform",
};

export function ActivityTimeline({ record }: { record: PublicRecord }) {
  const activity = record.activity ?? [];
  const missing = record.placeholders?.MISSING_TIMELINE;

  /* Tier 1 — local news (non-budget, scope !== NATIONAL) */
  const localNews = activity.filter(
    (a) => a.scope !== "NATIONAL" && !isBudgetCategory(a.category),
  );

  /* Tier 2 — budget updates specific to this LGA (budget-related, scope !== NATIONAL) */
  const budgetUpdates = activity.filter(
    (a) => a.scope !== "NATIONAL" && isBudgetCategory(a.category),
  );

  /* Tier 3a — projected national entries (admitted, sourced by the OS) */
  const nationalProjected = activity.filter((a) => a.scope === "NATIONAL");

  /* Tier 3b — constitutional developments (static educational floor) */
  const constitutional = constitutionalDevelopments;

  const hasLocal = localNews.length > 0 || budgetUpdates.length > 0;
  const showBudgetSection = localNews.length > 0 && budgetUpdates.length > 0;

  return (
    <motion.section
      variants={fadeRise}
      initial="hidden"
      animate="visible"
      className="rounded-card bg-surface p-4 shadow-card"
      aria-label={record.vocabulary?.ACTIVITY_REGION_TITLE ?? "Latest Updates"}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-ink">
          {record.vocabulary?.ACTIVITY_REGION_TITLE ?? "Latest Updates"}
        </h3>
        {activity.length > 0 && record.vocabulary?.VIEW_ALL ? (
          <span className="text-sm font-semibold text-primary">{record.vocabulary.VIEW_ALL}</span>
        ) : null}
      </div>

      {/* ── Tier 1 + 2: Local section ─────────────────────────────── */}
      {hasLocal ? (
        <>
          {localNews.length ? (
            <ol className="mt-4">
              {localNews.map((item, i) => (
                <TimelineRow
                  key={`${item.activity_code}-${i}`}
                  item={item}
                  last={i === localNews.length - 1 && !showBudgetSection}
                />
              ))}
            </ol>
          ) : budgetUpdates.length ? (
            /* Budget updates fill the first slot when no general local news exists */
            <ol className="mt-4">
              {budgetUpdates.map((item, i) => (
                <TimelineRow
                  key={`${item.activity_code}-${i}`}
                  item={item}
                  last={i === budgetUpdates.length - 1}
                />
              ))}
            </ol>
          ) : (
            <p className="mt-3 text-[13px] leading-relaxed text-ink-faint">
              No recent developments recorded for this local government yet.
            </p>
          )}

          {/* Budget updates as a distinct section when local news also exists */}
          {showBudgetSection ? (
            <div className="mt-4 border-t border-line pt-3">
              <p className="text-[11px] font-bold uppercase tracking-label text-ink-faint">
                Budget Updates
              </p>
              <ol className="mt-3">
                {budgetUpdates.map((item, i) => (
                  <TimelineRow
                    key={`${item.activity_code}-bud-${i}`}
                    item={item}
                    last={i === budgetUpdates.length - 1}
                  />
                ))}
              </ol>
            </div>
          ) : null}
        </>
      ) : (
        /* Reserved empty slot — never filled with national stories */
        <div className="mt-3 flex items-start gap-3.5">
          <div className="relative flex flex-col items-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-sunken text-ink-faint">
              <Icon name="document" size={22} />
            </div>
            <div className="mt-1 h-10 w-0.5 rounded bg-line" />
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-line" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink">{missing?.title ?? "The record is quiet here"}</p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">
              {missing?.body ?? "When constitutional events affect this local government, they appear here — admitted, dated and sourced."}
            </p>
          </div>
        </div>
      )}

      {/* ── Tier 3: Constitutional developments — always shown ────── */}
      <div className="mt-4 border-t border-line pt-3">
        <p className="text-[11px] font-bold uppercase tracking-label text-ink-faint">
          Affecting all Local Governments
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-ink-faint">
          National developments that shape how every local government operates.
        </p>
        <ol className="mt-3">
          {nationalProjected.map((item, i) => (
            <TimelineRow
              key={`${item.activity_code}-nat-${i}`}
              item={item}
              last={i === nationalProjected.length - 1 && constitutional.length === 0}
            />
          ))}
          {constitutional.map((dev, i) => (
            <ConstitutionalRow
              key={dev.id}
              dev={dev}
              last={i === constitutional.length - 1}
            />
          ))}
        </ol>
      </div>
    </motion.section>
  );
}

function TimelineRow({ item, last }: { item: ActivityEntry; last: boolean }) {
  const role = osRole(item.presentation?.colour_role);
  const glyph = osIcon(item.presentation?.icon);
  const date = formatDateShort(item.occurred_at);

  return (
    <li className="flex gap-3.5">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${role.bubble}`}
        >
          <Icon name={glyph} size={18} />
        </div>
        {!last ? <div className="my-1 w-0.5 flex-1 rounded bg-line" /> : null}
      </div>
      <div className="min-w-0 flex-1 pb-5">
        <p className={`text-[11px] font-bold uppercase tracking-wide ${role.text}`}>
          {item.category}
          {date ? <span className="font-medium text-ink-faint">{`  ·  ${date}`}</span> : null}
        </p>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className="truncate text-[15px] font-bold text-ink">{item.title}</p>
          <span className="flex shrink-0 items-center gap-1.5">
            {item.badge ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-status-verified text-white">
                <Icon name="check" size={12} strokeWidth={3} />
              </span>
            ) : null}
            <Icon name="chevron-right" size={15} className="text-ink-hint" />
          </span>
        </div>
        {item.summary ? (
          <p className="mt-0.5 truncate text-[13px] text-ink-soft">{item.summary}</p>
        ) : null}
      </div>
    </li>
  );
}

function ConstitutionalRow({
  dev,
  last,
}: {
  dev: ConstitutionalDevelopment;
  last: boolean;
}) {
  const role = osRole(dev.presentation.colour_role);
  const glyph = osIcon(dev.presentation.icon);
  const date = formatDateShort(dev.date);
  const categoryLabel = CATEGORY_LABELS[dev.category] ?? dev.category;

  return (
    <li className="flex gap-3.5">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${role.bubble}`}
        >
          <Icon name={glyph} size={18} />
        </div>
        {!last ? <div className="my-1 w-0.5 flex-1 rounded bg-line" /> : null}
      </div>
      <div className="min-w-0 flex-1 pb-5">
        <p className={`text-[11px] font-bold uppercase tracking-wide ${role.text}`}>
          {categoryLabel}
          {date ? <span className="font-medium text-ink-faint">{`  ·  ${date}`}</span> : null}
        </p>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className="text-[15px] font-bold text-ink">{dev.title}</p>
          <Icon name="chevron-right" size={15} className="text-ink-hint" />
        </div>
        {dev.summary ? (
          <p className="mt-0.5 text-[13px] leading-relaxed text-ink-soft">{dev.summary}</p>
        ) : null}
        <p className="mt-1 text-[11px] text-ink-faint">{dev.authority}</p>
        {dev.impact ? (
          <p className="mt-0.5 text-[12px] leading-relaxed text-ink-faint">{dev.impact}</p>
        ) : null}
      </div>
    </li>
  );
}
