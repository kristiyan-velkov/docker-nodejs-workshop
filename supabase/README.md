# Supabase setup — workshop auth & progress

## 1. Enable Email auth

In [Supabase Dashboard](https://supabase.com/dashboard) → **Authentication** → **Providers** → enable **Email**.

For workshops, you may disable “Confirm email” under Email settings so sign-up is instant.

## 2. Run the migration

Open **SQL Editor** → New query → paste and run:

[`migrations/20250610000001_workshop_auth_and_progress.sql`](./migrations/20250610000001_workshop_auth_and_progress.sql)

## 3. Configure the Vite app

Copy `.env.example` to `.env.local`:

```bash
VITE_SUPABASE_URL=https://ritzzqmnivjosdxfeknk.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key
```

Your existing `NEXT_PUBLIC_*` variables also work.

Find keys under **Project Settings** → **API** (anon / publishable key).

## 4. Make yourself admin

After you sign up once in the app, run in SQL Editor:

```sql
update public.profiles
set role = 'admin'
where email = 'your-email@example.com';
```

Admins see **Admin Panel** with all participant progress and questions.

## Tables

| Table | Purpose |
|-------|---------|
| `profiles` | User profile + `role` (`participant` \| `admin`) |
| `task_progress` | Per-task timer state synced from the UI |
| `workshop_questions` | Questions submitted by participants |

## Cursor Supabase MCP note

If MCP auth shows “Organization unavailable”, skip MCP and use this SQL file + Dashboard instead.
