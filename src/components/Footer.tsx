import { Container } from "lucide-react";
import { SOCIAL_LINKS } from "../constants/data";

const RESOURCES = [
  {
    label: "Sample App",
    href: SOCIAL_LINKS.sampleApp,
    description: "workshop-node-congress",
  },
  {
    label: "Docker Node.js Guide",
    href: SOCIAL_LINKS.documentation,
    description: "Official documentation",
  },
  {
    label: "Frontend World Newsletter",
    href: SOCIAL_LINKS.newsletter,
    description: "Weekly frontend insights",
  },
];

const SUPPORT = [
  { label: "Donate via Stripe", href: SOCIAL_LINKS.donate },
  { label: "GitHub Sponsors", href: SOCIAL_LINKS.githubSponsors },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-200">
                <Container className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-base font-bold text-slate-900">
                  Node.js Docker Workshop
                </p>
                <p className="text-sm text-slate-400">Node.js Congress {year}</p>
              </div>
            </div>

            <p className="mb-6 max-w-sm text-sm leading-relaxed text-slate-500">
              A hands-on workshop for containerizing full-stack Node.js
              applications with Docker Compose, multi-stage builds, and CI/CD.
            </p>

            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 no-underline shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:-translate-y-0.5"
            >
              GitHub Repository
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                Resources
              </p>
              <ul className="space-y-3">
                {RESOURCES.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm font-medium text-slate-700 no-underline transition hover:text-blue-600"
                    >
                      {item.label}
                    </a>
                    <p className="text-xs text-slate-400">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                About the author
              </p>
              <p className="text-base font-bold text-slate-900">Kristiyan Velkov</p>
              <p className="mb-4 text-sm text-slate-500">
                Software Engineer · Docker Advocate
              </p>
              <ul className="space-y-2">
                {SUPPORT.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-slate-600 no-underline transition hover:text-blue-600"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-slate-600 no-underline transition hover:text-blue-600"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <p>
            &copy; {year} Kristiyan Velkov &middot; Node.js Docker Workshop
            &middot; MIT License
          </p>
          <span>Built with React, Supabase &amp; Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
};
