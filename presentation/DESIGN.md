# The Citizen Design Language

The Citizen application does not look like a government website, because it is
not one. It is a window into an operating system that governs public truth.
Everything below exists to make that feel true on a phone: minimal, calm,
confident, and rewarding to the curious.

This document is the authority on **why** the visual system is the way it is.
The token sheet ([tokens/theme.css](tokens/theme.css)) is the authority on
**what** the values are. No component may hardcode a visual value.

---

## 1. Principles

1. **Mobile is canonical.** Every screen is designed for a phone. Desktop is
   the same phone, held still inside a fixed device shell — the website moves
   around the phone, never the phone itself.
2. **Never overwhelm; reward curiosity.** Information unfolds in drawers, one
   layer at a time. The deepest layer is a dedicated page a citizen *earns*,
   not a wall they hit.
3. **Colour is constitutional.** No colour is decorative. Every colour answers
   the question *"what is the record's posture on this fact?"*
4. **Silence is designed.** UNKNOWN is a governed state. Missing truth renders
   as honest, calm absence — never a blank, never an error scream.
5. **Motion is conversation.** Springs, not scripts. Critically damped by
   default; bounce only after a gesture that carried momentum. Everything
   respects `prefers-reduced-motion`.

## 2. The constitutional colour language

| Family | Token root | Meaning | Why it exists |
| --- | --- | --- | --- |
| **Green** | `--c-primary`, `--c-status-verified` | Affirmed truth | The civic identity of the Republic. Green is *earned* — it appears only where the record affirms (verified claims, primary actions). Verification **is** the brand, so verified and primary share one hue. |
| **Blue** | `--c-status-reference` | Governed reference | A fact recognised in a constitutional repository but shown by reference (an office, an office holder). Blue is calm authority without the "checked against evidence" claim green makes. |
| **Amber** | `--c-status-contested` | Attention | Contested claims and conflicts. Amber demands awareness without alarm — the system is working, not failing. |
| **Slate blue** | `--c-status-pending` | Pending | Admitted, clock running. Quieter than amber because *nothing is wrong*; the system refuses early certainty. |
| **Grey** | `--c-status-unknown` | Governed absence | Honest silence. Grey never means "error"; it means "no admitted evidence answers this yet". |
| **Sepia** | `--c-status-historical` | The past | True of its time, superseded now. Sepia reads as archive, not as failure. |
| **Ink family** | `--c-ink*` | Text | Four steps (ink → soft → faint → hint) so hierarchy comes from a single ramp, never ad-hoc greys. |
| **Surfaces** | `--c-surface*` | Elevation | White cards rise from a green-tinted floor (`surface-sunken`); the tint keeps even empty screens unmistakably civic. |
| **Frame** | `--c-frame-night`, `--c-frame-body` | The world outside the screen | On desktop the website is night around a lit phone. The device is the only bright object, so the eye goes to the OS, never to the chrome. |

Interaction tokens (`--c-focus`, `--c-press`, `--c-disabled-*`) derive from the
same families: focus is affirmed green (the system affirms your position),
press is the quiet green wash, disabled is the neutral ramp.

Alpha composition: colours are stored as R G B triplets so any token can carry
any opacity (`rgb(var(--c-primary) / 0.4)`) without minting new colours.

## 3. Status system

The OS decides **which** status applies (badge codes on the projection). The
application decides only how each posture **looks and teaches**:

- Registry: [status/registry.ts](status/registry.ts) — tone, icon, and three
  layers of civic education per posture (*meaning → mechanics → implication*).
- Presentation: `StatusChip` renders the projected label verbatim.
- Education: with `interactive`, a chip opens the **StatusSheet** — tap any
  status anywhere and the system explains itself, one drawer at a time.

Unknown codes fall back to UNKNOWN education: honest silence, never invented
certainty.

## 4. The information-reveal model

`LayeredReveal` is the one drawer mechanism. Opening a layer shows its content
*and* the handle of the next layer. Used by:

- **TruthJourney** (the lower panel behind every answer):
  *Why we know this → How it was decided → Evidence used → The authority it
  rests on → What you can rely on → Verification record → [hold the seal] →
  the dedicated Constitutional Record page* (original judgement and primary
  evidence live there, rendered verbatim).
- **StatusSheet** education layers.

The terminal transition to a page is deliberately quiet: the seal hold
(`SealHold`) is the application's one earned flourish — press and hold for
1.6 s, a ring fills, the seal stamps, the record opens. Enter/Space or a
simple tap does the same thing; the hold is the delight, never the toll.

## 5. Motion vocabulary

All timings live in [animations/motion.ts](animations/motion.ts) and the CSS
duration/easing tokens. Rules:

- Feedback on pointer-**down** (`.pressable`), never only on release.
- Springs are critically damped; `springMomentum` (slight bounce) only after
  real gesture velocity.
- Sheets slide up and leave **down** (spatial consistency), track the finger
  1:1, rubber-band past the top, and commit on release *velocity*.
- The bottom-nav indicator is one object that slides between tabs
  (`layoutId`), not two dots blinking.
- `MotionConfig reducedMotion="user"` + the global CSS guard cover both
  Framer-driven and CSS-driven motion.

## 6. Surfaces and depth

- One card primitive (`Card`), one radius scale (`--r-*`), one elevation ramp
  (`--shadow-*`): higher surfaces cast deeper, softer shadows.
- The bottom navigation is translucent material (`backdrop-blur`) — content
  scrolls *under* it; it is chrome of the device, not of the page.
- Placeholder art ([placeholders/art.tsx](placeholders/art.tsx)) resolves its
  fixed colours from the token sheet; only the generative landscape derives
  hues procedurally from the civic green family, seeded per place.

## 7. Accessibility commitments

- 44 px minimum touch targets (`--tap-target`, `min-h-tap`).
- Visible `:focus-visible` ring in affirmed green on every interactive
  element.
- Text colour ramp holds AA on white at its intended sizes (`ink-hint` is
  decorative only).
- Every reveal surface is a real `<button>` with `aria-expanded`; sheets are
  `role="dialog"` with Escape, scrim tap and drag dismissal; search results
  announce through a polite live region.
- Reduced motion: transforms drop to cross-fades; the seal ritual fires
  immediately on activation.
