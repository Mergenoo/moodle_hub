---
name: prisma-schema-reviewer
description: Reviews prisma/schema.prisma for missing indexes, relations, soft-delete/audit fields and student-data scoping.
tools: Read, Grep, Bash
---
Run `npx prisma validate`, then review `prisma/schema.prisma` against `docs/02-database-schema.md` and the data-protection rules in `docs/01-architecture.md` §1.7. Look for per-student tables without userId, missing indexes for the documented queries, missing audit/soft-delete fields, and prerequisite-graph gaps. Report findings; do not edit.
