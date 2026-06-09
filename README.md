# Municipal Complaints Management System

A full-stack Next.js, Tailwind CSS, and TypeScript web application for a municipality/city call center complaints hotline. It supports public complaint intake, complaint assignment, interventions, escalation, resolution/closure tracking, analytics/reporting, notifications concepts, and role-based access control planning.

## Implemented Architecture

### 1. Frontend presentation layer

- Next.js App Router application shell in `src/app`.
- Tailwind CSS v4 global styling in `src/app/globals.css`.
- Reusable feature components in `src/components`:
  - `ComplaintIntakeForm` for the complete register intake form.
  - `ComplaintWorkspace` for client-side complaint state after submissions.
  - `ComplaintsRegister` for register and assignment queue visibility.
  - `LifecycleBoard` for workflow tracking.
  - `ReportingDashboard` for analytics and reporting.
  - `AccessControl` for RBAC and notification module planning.
  - `MetricCard` for KPI tiles.

### 2. Backend API layer

- `GET /api/complaints`: list all complaint records.
- `POST /api/complaints`: create a new complaint record with validation.
- `GET /api/complaints/[issueId]`: retrieve one complaint by Issue ID.
- `PATCH /api/complaints/[issueId]`: update one complaint by Issue ID.

### 3. Domain, validation, and persistence layer

- `src/types/complaints.ts` defines complaint register fields, workflow types, enums, and API response types.
- `src/lib/complaint-validation.ts` validates required fields, enum values, phone number format, and complaint year format.
- `src/lib/complaint-store.ts` provides a file-backed persistence service for local development and can be replaced by PostgreSQL/Prisma in production.
- `src/data/mock-data.ts` provides workflow configuration and seed complaint records.

## Minimum Complaints Register Schema

The intake form and backend model include these fields:

- Issue ID
- Call Center Agent Name
- Call Center Agent Code
- Date of Complaint
- Month of Complaint
- Year of Complaint
- Time of Complaint
- Complaint Code
- Complaint Channel
- Complaint Priority
- Waste Account ID
- Name of Complainant
- Gender of Complainant
- Address of Complainant
- Complaint Region (East/West/Central)
- Complainant Mobile No.
- Type/Category of Complaint
- Location of Complaint/Event
- Complaint Description Details
- Dominant Source of Information (Radio/TV/Online/etc.)
- Name of Offender/Accused
- Location/Address of Offender
- Internal Assignee Name
- Internal Assignee Department
- Complaint Assignment Date
- Assignment Comments
- Internal Escalation Status
- Escalation Date
- Escalation Notes
- Complaint Resolution Status
- Resolution Date
- Resolution Comments

## Core Modules

1. **Complaints Logging**: call center agents log all register fields and generate an Issue ID.
2. **Complaints Assignment**: internal assignee, department, assignment date, and assignment comments.
3. **Complaints Actions/Interventions**: action-ready status and departmental accountability fields.
4. **Complaints Escalation**: escalation status, date, and notes.
5. **Complaints Resolution and Closure**: resolution status, date, and comments.
6. **Analytics, Insights and Reporting**: dashboards by category, region, department, and information source.
7. **User Account and Access Control Management**: role matrix for agents, supervisors, officers, escalation managers, and administrators.
8. **Complaints Lifecycle Tracking**: workflow board from logging to analytics.
9. **Notifications Management**: planned SMS/email/in-app assignment, escalation, and closure alerts.

## Core Folder Structure

```text
.
├── data/                         # Runtime JSON complaint store for local development
├── public/                       # Static assets
├── src/
│   ├── app/
│   │   ├── api/complaints/       # Backend API route handlers
│   │   ├── globals.css           # Tailwind and global styles
│   │   ├── layout.tsx            # Root layout and metadata
│   │   └── page.tsx              # Dashboard page
│   ├── components/               # Reusable UI and feature components
│   ├── data/                     # Seed records and workflow configuration
│   ├── lib/                      # Validation, persistence, and utilities
│   └── types/                    # TypeScript domain model
├── eslint.config.mjs             # ESLint + Next.js linting configuration
├── next.config.ts                # Next.js runtime configuration
├── package.json                  # Scripts and dependencies
├── postcss.config.mjs            # Tailwind CSS v4 PostCSS integration
└── tsconfig.json                 # TypeScript compiler configuration
```

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Run quality checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Production Notes

The included file-backed store is intentionally simple for local development and code review. For production deployment, replace `src/lib/complaint-store.ts` with a database-backed repository using PostgreSQL, add authenticated users, implement RBAC enforcement in middleware/server actions, and connect notification jobs to SMS/email providers.
