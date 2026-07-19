/**
 * Relationship slot registry — presentation ordering for the constitutional
 * relationship row. Slots are fixed presentation positions; the OS projection
 * decides whether an office holder exists for each. Adding a future
 * relationship (Vice Chairman, Councillors…) means adding a slot here.
 */
import type { IconAlias } from "./icons/registry";

export interface RelationshipSlot {
  slot_code: string;
  /** Context provider code emitted by the OS projection. */
  provider: string;
  label: string;
  accent: "blue" | "green";
  icon: IconAlias;
}

export const RELATIONSHIP_SLOTS: RelationshipSlot[] = [
  {
    slot_code: "PRESIDENT",
    provider: "FEDERAL_EXECUTIVE_HEAD",
    label: "President",
    accent: "blue",
    icon: "landmark",
  },
  {
    slot_code: "GOVERNOR",
    provider: "OWNER_EXECUTIVE_HEAD",
    label: "Governor",
    accent: "green",
    icon: "landmark",
  },
  {
    slot_code: "STATE_ASSEMBLY",
    provider: "STATE_ASSEMBLY_REPRESENTATION",
    label: "State Assembly",
    accent: "green",
    icon: "people",
  },
  {
    slot_code: "HOUSE_OF_REPS",
    provider: "FEDERAL_CONSTITUENCY_REPRESENTATION",
    label: "House of Reps",
    accent: "green",
    icon: "people",
  },
  {
    slot_code: "SENATOR",
    provider: "SENATORIAL_REPRESENTATION",
    label: "Senator",
    accent: "green",
    icon: "people",
  },
];
