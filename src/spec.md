# Specification

## Summary
**Goal:** Build a mobile-first Handyman Recruitment Agency website with public pages, forms with document uploads, an Internet Identity–protected admin dashboard, and basic SEO—without any outbound email.

**Planned changes:**
- Create public site pages and routing: Home, Handyman Registration, Hire a Handyman, Services Offered, About Us, Contact, Privacy Policy, and Admin; add top navigation + mobile hamburger menu.
- Apply a consistent black/yellow/navy “trade/industrial” theme with bold headings, high-contrast CTAs, and responsive layouts.
- Add the uploaded logo as a static asset and display it in the header and Home hero.
- Implement Home page content: intro, CTAs (Register / Hire), clickable phone + WhatsApp, mailto link, Facebook link text, operating locations (Uitenhage, Gqeberha), and a 3-step “How it works” section.
- Add a floating bottom-right WhatsApp button on all public pages linking to 0712115763.
- Build Handyman Registration form with required fields and document uploads (CV PDF + other documents), persist submissions, and show the specified confirmation message.
- Build Hire a Handyman client enquiry form, persist submissions, and show an on-screen confirmation message (no email).
- Build Contact page with clickable contact details plus candidate and client message forms that persist to backend (no email).
- Create Services Offered and About Us pages with short professional copy matching the requested bullet points.
- Implement backend storage in a single Motoko actor for registrations (including documents), enquiries, and contact messages with stable unique IDs and timestamps.
- Implement secure document handling so uploads are stored with the candidate record and only downloadable by authorized admins via the dashboard.
- Build an Admin dashboard to view/filter (by Trade/Skill)/inspect/update/delete records and download candidate documents.
- Add admin authentication with Internet Identity plus backend authorization checks and an allowlist mechanism; show the signed-in principal and authorization status in the Admin UI.
- Add basic SEO readiness: per-page meta title/description, semantic headings, accessible labels, plus static robots.txt and sitemap.

**User-visible outcome:** Visitors can browse the agency site, register as a handyman with document uploads, submit hire/contact enquiries, and see confirmation messages; authorized admins can sign in with Internet Identity to review/filter/manage submissions and download documents, with SEO-ready public pages.
