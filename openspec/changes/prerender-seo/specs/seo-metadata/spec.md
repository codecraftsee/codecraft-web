## ADDED Requirements

### Requirement: Each route has its own title and description
Every public route SHALL define `data.seo` with a title and description, applied to `<title>` and `<meta name="description">` after navigation and in the prerendered HTML.

#### Scenario: Services page metadata
- **WHEN** `/services/` is fetched
- **THEN** `<title>` and the meta description describe the service offering, not the generic site title

#### Scenario: Route without seo data
- **WHEN** a route has no `data.seo`
- **THEN** the site name and default description are used

### Requirement: Social preview tags
Every page SHALL include `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` (absolute URL, 1200×630) and `twitter:card = summary_large_image` with matching title, description and image.

#### Scenario: LinkedIn link preview
- **WHEN** a page URL is pasted into LinkedIn
- **THEN** the preview shows the page title, description and the CodeCraft share image

### Requirement: Single canonical URL per page
Each page SHALL have exactly one `<link rel="canonical">` with the absolute URL on `https://www.codecraftsolutions.rs`, ending in `/` for non-root routes, without query string or fragment.

#### Scenario: Canonical with tracking parameters
- **WHEN** a visitor lands on `/contact?utm=li#form`
- **THEN** the canonical URL is `https://www.codecraftsolutions.rs/contact/`

### Requirement: Organization structured data
The site SHALL include Organization JSON-LD with name, URL, logo, email, founding date and Novi Sad address.

#### Scenario: Rich results test
- **WHEN** the home page is checked with Google's Rich Results Test
- **THEN** an Organization entity is detected without errors

### Requirement: Crawl files
The site SHALL serve `robots.txt` allowing all crawlers and referencing `sitemap.xml`, which lists the four public URLs.

#### Scenario: Sitemap discovery
- **WHEN** a crawler fetches `/robots.txt`
- **THEN** it finds `Sitemap: https://www.codecraftsolutions.rs/sitemap.xml` listing `/`, `/services/`, `/team/`, `/contact/`
