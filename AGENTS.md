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
- Presentation
- Navigation
- Discovery
- Maps
- User experience

This repository MUST NOT contain:

- Kernel code
- Engine implementations
- Runtime services
- Constitutional logic
- Truth compilation
- Verification
- Database access

Those belong in **caos**.

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

Citizen renders constitutional truth.

It does not create it.
