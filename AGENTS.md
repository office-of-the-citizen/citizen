# AGENTS.md
## Citizen

This document governs AI agents operating within the **citizen** repository.

---

## Repository Identity

Current repository:

**citizen**

Purpose:

The official public application for discovering and interacting with constitutional truth published by CAOS.

Citizen is a client.

It is not part of the operating system.

---

## Responsibilities

This repository may contain:

- Public interfaces
- Presentation (labels, icons, colours, typography)
- Navigation / discovery UX
- Maps
- Application view-model composition (permanent snapshot + live truth)

This repository MUST NOT contain:

- Kernel code
- Engine implementations
- Runtime services
- Constitutional logic
- Truth compilation
- Verification
- Database access
- A second spatial object registry

Those belong in **caos**.

---

## Data sources (Founder Amendment 2026-07-21)

```
Permanent geography:  SDK distributes Engine 10 permanent snapshot (CAOS-owned)
Live truth:           CAOS via SDK HTTP client (Engine 12 → Engine 10 truth projections)
Composition:          Citizen only (no SDK compose helpers)
```

- Load permanent snapshot first; overlay truth when available.
- Continue rendering when truth is unavailable.
- Population comes from truth only — never from the permanent snapshot.
- Area, ward_count, polling_unit_count come from the permanent snapshot.

The SDK does **not** own permanent objects; it distributes a published snapshot.
CAOS remains the sole constitutional owner.

---

## Repository Boundary

Citizen communicates with CAOS only through the official **CAOS SDK** and public APIs.

Agents SHALL NOT:

- import CAOS internals
- duplicate constitutional logic
- bypass the SDK
- implement operating system behavior

If functionality is unavailable through the SDK or public API, stop and recommend extending the appropriate contract.

---

## Final Rule

Citizen renders constitutional truth and permanent geography.

It does not create either.
