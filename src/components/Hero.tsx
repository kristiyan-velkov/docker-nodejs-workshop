import { SOCIAL_LINKS } from "../constants/data";

export const Hero = () => {
  return (
    <header className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#339933] via-[#1a6b1a] to-[#339933] animate-background-shift relative overflow-hidden px-8 py-8">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-float animate-delay-100"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-green-300/30 rounded-full animate-gentle-bounce animate-delay-200"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-emerald-300/20 rounded-full animate-scale-pulse animate-delay-300"></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-white/15 rounded-full animate-float animate-delay-500"></div>
      </div>

      <div className="max-w-4xl text-center relative z-10 animate-hero-entrance">
        <div className="flex items-center justify-center gap-8 mb-8 animate-logo-float">
          <div
            className="h-28 w-28 md:h-32 md:w-32 rounded-2xl bg-[#339933] border-4 border-white/30 flex items-center justify-center shadow-2xl animate-glow-intense"
            aria-label="Node.js logo"
          >
            <span className="text-white font-extrabold text-2xl md:text-3xl tracking-tight">
              Node.js
            </span>
          </div>
          <span className="text-5xl md:text-6xl text-white font-bold opacity-90 animate-scale-pulse">
            +
          </span>
          <div className="text-8xl md:text-9xl animate-docker-bounce">🐳</div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight animate-title-reveal">
          Node.js Docker Workshop
          <span className="block bg-gradient-to-r from-[#4facfe] to-[#00f2fe] bg-clip-text text-transparent">
            Node.js Congress 2026
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto animate-subtitle-reveal">
          Master Docker containerization for full-stack Node.js applications.
          Containerize Express + Vite + PostgreSQL with production-ready
          patterns, Compose Watch, and CI/CD.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-button-reveal">
          <a
            href={SOCIAL_LINKS.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-8 py-4 text-lg font-semibold bg-white text-[#339933] rounded-xl shadow-xl"
          >
            View Documentation
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-8 py-4 text-lg font-semibold bg-white/10 text-white rounded-xl border-2 border-white backdrop-blur-sm"
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </header>
  );
};
