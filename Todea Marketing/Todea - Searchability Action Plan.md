# Todea Searchability Action Plan

**Date:** April 8, 2026
**Context:** Solo-founder engineering startup (Ltd.) in South Korea, no clients yet

---

## Current State Assessment

**What you have:**
- Website: todea.co.kr (live)
- LinkedIn company page: linkedin.com/company/todea/
- GitHub org: github.com/TodeaEngineering (1 public repo, no stars, no public members)
- Google Analytics connected
- Google Business Profile registered

**Key problem:** Searching for "todea.co.kr" or "Todea engineering South Korea" returns zero results about your company. You're effectively invisible to search engines right now.

---

## Phase 1: Technical SEO Foundation (Week 1-2)

These are one-time fixes that permanently improve everything you publish afterward.

### 1.1 Website Technical Audit
- [x] Ensure every page has a unique `<title>` tag (50-60 chars) with your primary keyword. Example: *"Todea | Infrastructure Engineering Consulting — Seoul, South Korea"*
- [x] Add a `<meta name="description">` to every page (under 155 chars) that clearly says what you do and where
- [x] Add Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) so links look good when shared on LinkedIn/social
- [x] Add a `robots.txt` file allowing all crawlers
- [x] Create and submit an XML sitemap to Google Search Console (search.google.com/search-console) — **this is the single most important step to get indexed**
- [ ] Verify your site in Google Search Console using DNS or HTML file method
- [ ] Run a Lighthouse audit (Chrome DevTools → Lighthouse) and fix any SEO/performance issues
- [x] Ensure the site is mobile-friendly and loads in under 3 seconds
- [x] Add structured data (JSON-LD) for Organization schema:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Todea",
    "url": "https://todea.co.kr",
    "logo": "https://todea.co.kr/logo.png",
    "description": "Infrastructure engineering consulting",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KR"
    },
    "sameAs": [
      "https://www.linkedin.com/company/todea/",
      "https://github.com/TodeaEngineering"
    ]
  }
  ```
- [x] Set up hreflang tags if you plan to have both Korean and English content

### 1.2 Google Search Console Setup
- [ ] Submit your sitemap
- [ ] Request indexing for your homepage and key pages manually via the URL Inspection tool
- [ ] Monitor the "Coverage" report weekly for any crawl errors

### 1.3 Google Business Profile Optimization
- [ ] Complete every field: business category, description, services, hours, photos
- [ ] Add your website URL and all social links
- [ ] Choose the most specific business category possible (e.g., "Software Company" or "IT Consulting")
- [ ] Add 5+ photos (office, logo, you working, project screenshots)
- [ ] Write a keyword-rich business description (750 chars max)

---

## Phase 2: Content That Ranks (Week 2-4)

As a solo founder with no clients, content is your primary tool for being discovered.

### 2.1 Create Core Website Pages
These pages should exist on todea.co.kr before anything else:

- [ ] **Services page** — Clearly describe what you build and for whom. Use the language your potential clients would search for (e.g., "cloud infrastructure consulting," "DevOps engineering services Korea")
- [ ] **About page** — Your story, your expertise, why you started Todea. This builds E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness), which Google heavily weights
- [ ] **Contact page** — Include a form, email, and physical location (even if it's a registered address). Local SEO needs an address
- [ ] **Case studies / Portfolio page** — Even without clients, document personal projects, open-source contributions, or hypothetical case studies showing your approach

### 2.2 Start a Technical Blog (2-3 posts/month)
This is the highest-ROI activity for a solo technical founder. Focus on bottom-of-funnel content first:

- [ ] Write posts answering specific questions your potential clients Google, for example:
  - "How to set up Kubernetes on AWS in South Korea"
  - "Cloud infrastructure cost optimization for Korean startups"
  - "[Competitor tool] alternatives for [your niche]"
- [ ] Use long-tail keywords (3-5 word phrases) — as a new site, you cannot rank for "cloud computing" but you can rank for specific how-to queries
- [ ] Each post should be 1,000-2,000 words, with clear headings (H2, H3), and internal links to your services page
- [ ] Add a table of contents to longer posts
- [ ] Include original diagrams, screenshots, or code snippets — unique visual content helps ranking

### 2.3 Content Structure
- [ ] Create a "pillar page" for your main topic area (e.g., a comprehensive guide to infrastructure engineering)
- [ ] Write supporting "cluster" posts that link back to the pillar page
- [ ] Interlink all related posts to build topical authority

---

## Phase 3: Off-Site Presence & Backlinks (Week 3-6)

### 3.1 LinkedIn Strategy (15 min/day)
- [ ] Complete your personal LinkedIn profile — add "Founder at Todea" with a detailed description
- [ ] Make yourself a public member of the Todea org on GitHub
- [ ] Post 2-3x per week on your personal LinkedIn about what you're building, engineering insights, lessons learned as a solo founder in Korea
- [ ] Comment thoughtfully on 5+ posts per day from people in your target industry
- [ ] Join and participate in relevant LinkedIn groups (Korean tech, infrastructure, DevOps)
- [ ] Share each new blog post on LinkedIn with a native summary (don't just drop a link)

### 3.2 GitHub Presence
- [ ] Make yourself a public member of TodeaEngineering
- [ ] Add a detailed README to the org profile (`.github/profile/README.md`)
- [ ] Create 2-3 useful open-source tools or templates related to your expertise and publish them under the Todea org
- [ ] Add proper README files, documentation, and tags/topics to all repos
- [ ] Star and contribute to relevant open-source projects to build your network
- [ ] Add the todea.co.kr URL to every repo description

### 3.3 Directory Listings & Backlinks
- [ ] List Todea on Korean startup directories: startuprecipe.co.kr, platum.kr, thevc.kr
- [ ] List on international directories: crunchbase.com, wellfound.com, clutch.co, f6s.com
- [ ] Create profiles on: dev.to, hashnode.com, medium.com — cross-post your blog content (with canonical URLs pointing back to todea.co.kr)
- [ ] Submit to Product Hunt or Hacker News if/when you launch a product
- [ ] Answer questions on Stack Overflow, Reddit (r/devops, r/korea, r/startups) with helpful answers that naturally reference your expertise

### 3.4 Korean-Specific Discoverability
- Naver (Korean users primarily search via Naver, not Google)
  - [ ] Create a Naver Blog (blog.naver.com) and cross-post content
  - [x] Register your site with Naver Search Advisor (searchadvisor.naver.com)
  - [x] Submit your sitemap to Naver (https://searchadvisor.naver.com/console/site/request/sitemap?site=https%3A%2F%2Ftodea.co.kr)
  - [x] Request Webpage collection (https://searchadvisor.naver.com/console/site/request/crawl?site=https%3A%2F%2Ftodea.co.kr)
- Kakao
  - [ ] Create Kakao channel 
  - [ ] Register on Daum/Kakao search (register.search.daum.net)
- [ ] Consider creating a Naver Cafe or posting in relevant tech cafes
- [ ] If applicable, list on Korean B2B platforms like KMAPS or KOTRA

---

## Phase 4: Ongoing Optimization (Monthly)

### 4.1 Monitor & Iterate
- [ ] Review Google Search Console weekly: check what queries bring impressions, fix crawl errors
- [ ] Review Google Analytics monthly: identify which content performs, double down on it
- [ ] Track your ranking for 10-15 target keywords using a free tool (Google Search Console itself, or Ubersuggest free tier)
- [ ] Update and expand existing content every 2-3 months — Google rewards freshness

### 4.2 Build Authority Over Time
- [ ] Guest post on Korean tech blogs or international engineering blogs
- [ ] Speak at local meetups or online webinars (Korean startup events, DevOps meetups)
- [ ] Get quoted or featured in Korean tech media (reach out to Platum, Besuccess, TechRecipe)
- [ ] Collect testimonials the moment you get your first client — add to website immediately

### 4.3 AI Search Optimization (New in 2026)
- [ ] Structure content with clear Q&A format so AI search engines (Google AI Overviews, Perplexity, ChatGPT search) can extract answers
- [ ] Use FAQ schema markup on relevant pages
- [ ] Write content that directly answers questions in the first paragraph, then expands (the "inverted pyramid" approach)
- [ ] Ensure your brand name + description appear consistently across all platforms (AI models learn from cross-referencing multiple sources)

---

## Quick Wins Checklist (Do This Week)

1. **Submit sitemap to Google Search Console** — gets you indexed
2. **Register with Naver Search Advisor** — critical for Korean market
3. **Make yourself a public GitHub org member** — adds credibility
4. **Complete your Google Business Profile** — immediate local SEO boost
5. **Write and publish one blog post** — your first indexable content beyond the homepage
6. **Post on LinkedIn about launching Todea** — your network is your first audience

---

## Time Budget (Suggested Weekly — ~5 hours)

| Activity | Time |
|----------|------|
| Write 1 blog post | 2 hours |
| LinkedIn posting + engagement | 1 hour (15 min/day) |
| Technical SEO maintenance | 30 min |
| GitHub activity (commits, READMEs, open-source) | 1 hour |
| Directory listings & community participation | 30 min |

---

*The most important thing: consistency beats intensity. Publishing one quality blog post per week and engaging daily on LinkedIn will compound dramatically over 3-6 months.*
