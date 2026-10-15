import { defineConfig } from "prisma/config";

// The prototype runs on seed data and never connects. DATABASE_URL is only
// needed for `prisma migrate` once a real PostgreSQL instance exists.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    url: process.env.DATABASE_URL ?? "postgresql://localhost:5432/ufe_hub",
  },
});
