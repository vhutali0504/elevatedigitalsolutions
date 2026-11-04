# Decisions

## 2026-11-04: Redesign

**Light theme on the brand blue.** The brief asked for light, professional and animated. Colours are the blue from the Elevate logo (#1B4FD8) on a cool paper ground, with one blue section and one dark section for rhythm.

**Brand leads with EDS, logo is the hexagon from the owner's brand board.** The board is kept at `docs/logo/eds-brand-board.svg`, with its colours adopted as the site's tokens. Its text was live with fallback fonts, so the lettering is outlined from Outfit, the first font it names. Two additions to the board: a horizontal lockup on light backgrounds with an enlarged two-line name for the nav, because the board's proportions would be about 6px at that size, and the stacked name centred under the hexagon, where the board set it off-centre. An acronym says nothing to a new visitor and is hard to search, so the full name stays in the hero, page titles, legal pages, domain and email. Earlier logo explorations are in `docs/logo/elevate-version/` and `docs/logo/rising-e-version/`. No trademark search has been done.

**Described as a freelance partnership, not an agency.** EDS is not a registered business, so the site says "a freelance web development partnership" and "we". The old "agency" copy is gone, and the terms say plainly that it is not a registered company.

**The demo is the proof.** There is no permitted client work to show yet, and proof is not invented: no testimonials, client logos or business statistics. The site shows skill by running a real small website in the page, which reflows with container queries. The businesses in it are made up and the page says so. Thusa Lushaka is left out because, at last check, it was an unsolicited demo the NPO had not seen.

**Removed unsupported claims.** "14 day avg. turnaround" had no source. Timelines now come only from the FAQ. The old logo PNG is not used because it carries a ® mark and white lettering that disappears on a light page.

**No fade-in-on-scroll.** Banned by the ground rules. Entrances use masked lines, unrolling clips and a shutter on the photograph. The receipt in "How it works" feeds out with the scroll. All of it respects reduced motion, and the hero demo has a pause control.

**Cookie note is informational and sits in the page flow.** The site sets no tracking cookies, so a consent choice would change nothing. The old banner offered analytics and marketing toggles that did nothing. If analytics is added, this must become an opt-in first.

**No analytics or uptime monitoring installed.** These need an account and a decision from the owner. Tracked as open items below.

**Self-hosted font.** Cabinet Grotesk is served from this site, so no visitor data goes to a font CDN and the security policy can stay strict.

**Layout moved to client/ with config at the root.** Follows the standard project structure. `vite.config.js` sets `root: 'client'` and `envDir: '..'`, and output stays in `dist/`. `.env` moved from `src/` to the root because Vite was not reading it there. There is no `server/` because EmailJS and Netlify cover what a backend would do.

**Security headers in netlify.toml.** Strict CSP allowing only this site plus `api.emailjs.com` for the contact form.

## Open items for the owner

- EmailJS public key: replaced in `.env` on 2026-11-04, and a real test send from the local build was accepted. It must also be updated in Netlify. The old key was rejected as invalid and may still be on the live site until then.
- The owner has accepted the refund policy and confirmed the 24-hour reply and "backend, frontend and project management" wording (2026-11-04). A lawyer's review of the legal pages is still worthwhile.
- Take `docs/TRADEMARK_NOTE.md` to a trademark attorney. The owner's free CIPC search (classes 35 and 42, 2026-11-04) found no live exact EDS mark and no results for ELEVATE DIGITAL SOLUTIONS or ELEVATE DIGITAL, but many registered and pending ELEVATE marks, so the site keeps leading with EDS. A web search on 2026-11-04 found other South African web businesses using "Elevate" names, including Elevate WebDev and Elevate Web in Centurion and Elevate Digitals in Cape Town.
- Address: the owner confirmed on 2026-11-04 that EDS is online-only with no physical address, so the site shows Johannesburg only. When the legal pages are reviewed, ask whether section 43 of the Electronic Communications and Transactions Act requires a physical address for this business, and what to publish if so.
- Name an Information Officer and register with the Information Regulator if required under POPIA.
- Confirm "backend, frontend and project management are each covered" and the 24-hour reply promise are still true.
- Add EmailJS spending and rate limits, and an allowed-origin restriction, in the EmailJS dashboard.
- Decide on analytics and uptime monitoring.
- Add real client work and testimonials once they exist and clients agree.
