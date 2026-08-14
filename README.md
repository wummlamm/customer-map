# customer-map

Full-stack web application that manages companies and visualizes their
locations on an interactive map. Modernized re-implementation of my bachelor
thesis project ("Development of a web application with map-based data
visualization", HHU Düsseldorf, 2023) — rebuilt from scratch with a current
stack and deployed to Microsoft Azure.

**Live demo:** https://mango-pebble-018c25d1e.7.azurestaticapps.net
**API (Swagger UI):** https://customer-map-api-tomfreund-dhgyh8c0dcdecwg9.francecentral-01.azurewebsites.net/swagger-ui.html

## Tech stack

| Layer      | Technology |
|------------|------------|
| Backend    | Java 21, Spring Boot 3.5, Spring Data JPA, Flyway, springdoc-openapi |
| Database   | SQLite (local file, persisted on Azure App Service) |
| Frontend   | React 18, TypeScript, Vite, react-leaflet / OpenStreetMap |
| Hosting    | Azure App Service (backend) · Azure Static Web Apps (frontend) |
| CI/CD      | GitHub Actions → automated build & deploy to Azure |
| Testing    | JUnit 5, Mockito, ArchUnit (architecture rules), Vitest |

## Architecture

```mermaid
flowchart LR
    U[Browser] --> SWA[Azure Static Web Apps<br/>React + Leaflet]
    SWA -->|REST/JSON| API[Azure App Service<br/>Spring Boot API]
    API --> DB[(SQLite<br/>file storage)]
```

The frontend is built with the backend URL injected at build time
(`VITE_API_URL`) and deployed to Azure Static Web Apps. The backend runs as a
Spring Boot JAR on Azure App Service (Linux) and is deployed automatically from
this repository via GitHub Actions.

## CI/CD

Three GitHub Actions workflows run on every push to `main`:

| Workflow | Purpose |
|----------|---------|
| `ci.yml` | Builds and tests backend and frontend, also on pull requests |
| `main_customer-map-api-tomfreund.yml` | Runs backend tests, builds the executable JAR and deploys it to Azure App Service |
| `azure-static-web-apps-*.yml` | Builds the frontend and deploys it to Azure Static Web Apps, including preview environments for pull requests |

In the deployment workflow the tests run before the artifact is built, and the
deploy job depends on the build job. A failing test therefore stops the
deployment. Merging this with `ci.yml` into one pipeline with proper stages is
on the roadmap.

## Run locally

Prerequisites: Java 21 (downloaded automatically via Gradle toolchain),
Node.js 20+.

**1. Backend** (starts on http://localhost:8080)

```bash
cd backend
mkdir -p data
./gradlew bootRun        # Flyway migrates the schema on first start
```

Verify: http://localhost:8080/api/companies returns three demo companies.
Interactive API docs: http://localhost:8080/swagger-ui.html

**2. Frontend** (starts on http://localhost:5173)

```bash
cd frontend
npm install
cp .env.example .env     # sets VITE_API_URL=http://localhost:8080
npm run dev
```

Open http://localhost:5173 — the map shows all companies as markers;
new companies can be added via the form.

## Run tests

```bash
cd backend && ./gradlew test        # unit tests + ArchUnit architecture rules
cd frontend && npm test -- --run    # Vitest component tests
```

Both suites also run automatically in CI on every push (GitHub Actions).

## Configuration

All configuration is environment-based — no credentials in the repository.

| Variable | Used by | Default (local) | Production (Azure App Settings) |
|----------|---------|-----------------|----------------------------------|
| `SPRING_DATASOURCE_URL` | backend | `jdbc:sqlite:./data/customermap.db` | absolute path under `/home` (persistent storage) |
| `APP_CORS_ALLOWED_ORIGINS` | backend | `http://localhost:5173` | the deployed Static Web Apps origin |
| `VITE_API_URL` | frontend (build time) | `http://localhost:8080` | set in the deploy workflow, baked into the bundle |

## Why a re-implementation?

The original thesis code was written during my working student position and
belongs to my former employer. This repository is a clean rebuild: same idea,
my own code, upgraded from Spring Boot 2.7/Java 11 to Spring Boot 3.5/Java 21,
Create React App replaced by Vite, and extended with CI/CD and cloud
deployment as part of my Azure certification path.
## Roadmap

- [x] Deploy to Azure (App Service + Static Web Apps)
- [x] Restrict CORS to the deployed frontend origin
- [ ] Merge CI and deployment into a single pipeline with stages, so tests
      are not built twice
- [ ] Configure the Actuator health endpoint as the App Service health check
- [ ] Replace publish-profile authentication with OIDC / federated credentials
- [ ] Resolve the N+1 query in `findAll` with a fetch join or `@EntityGraph`
- [ ] Infrastructure as Code (Bicep)
- [ ] Integration tests with Testcontainers
- [ ] Upgrade to Spring Boot 4.x as a dedicated migration step
