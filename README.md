# ThinkSpace 💭

> **A place where people can share what's on their mind.**  
> Thoughts. Perspectives. Conversations. Short reflections.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.11-EF4444?logo=turborepo&logoColor=white)](https://turbo.build/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌟 Overview

**ThinkSpace** is a social platform built specifically for sharing thoughts, ideas, opinions, experiences, questions, and reflections. It is not just another Twitter/X or Instagram clone — it is designed as a calm, content-first digital sanctuary where curious minds share authentic perspectives, discuss ideas, and connect around topics.

---

## 🛠️ Tech Stack

| Component | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 6, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons |
| **State & Data** | TanStack Query v5 (React Query), Axios, React Hook Form, Zod |
| **Backend** | Node.js, Express, TypeScript, Helmet, CORS, Rate Limiting |
| **Database & Cache** | PostgreSQL, Prisma ORM, Redis |
| **Auth & Security** | JWT (access + refresh tokens), Argon2 password hashing |
| **Architecture** | pnpm Workspaces + Turborepo Monorepo |

---


## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Uppara-Veeranjaneyulu/ThinkSpace.git
cd ThinkSpace
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Environment setup
Copy `.env.example` to `.env` in the root:
```bash
cp .env.example .env
```
> Configure your PostgreSQL connection string in `DATABASE_URL` (supports local Docker or cloud providers like [Neon](https://neon.tech) / [Supabase](https://supabase.com)).

### 4. Run database services *(optional if using local Docker)*
```bash
docker compose up -d
```

### 5. Start development servers
```bash
pnpm dev
```

- 🌐 **Web App**: [http://localhost:5173](http://localhost:5173)
- 🔌 **API Server**: [http://localhost:3001](http://localhost:3001)
- 🩺 **Health Check**: [http://localhost:3001/api/health](http://localhost:3001/api/health)

---

## 🧪 Available Scripts

| Script | Description |
| :--- | :--- |
| `pnpm dev` | Start frontend and backend concurrently in dev mode |
| `pnpm build` | Build all apps and packages for production |
| `pnpm typecheck` | Run TypeScript type checks across all workspaces |
| `pnpm test` | Run test suite with Vitest |
| `pnpm db:generate` | Generate Prisma Client |
| `pnpm db:migrate` | Apply database migrations |
| `pnpm db:seed` | Seed database with demo data |
| `pnpm db:studio` | Launch visual Prisma Studio database GUI |

