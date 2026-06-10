import "@testing-library/jest-dom";
import { vi } from "vitest";

vi.mock("./contexts/AuthContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({
    configured: true,
    loading: false,
    session: { user: { id: "test-user", email: "test@example.com" } },
    user: { id: "test-user", email: "test@example.com" },
    profile: {
      id: "test-user",
      email: "test@example.com",
      full_name: "Test User",
      role: "participant" as const,
      created_at: "",
      updated_at: "",
    },
    isAdmin: false,
    signIn: vi.fn().mockResolvedValue(null),
    signUp: vi.fn().mockResolvedValue(null),
    signOut: vi.fn().mockResolvedValue(undefined),
    refreshProfile: vi.fn().mockResolvedValue(undefined),
  }),
}));

vi.mock("./lib/supabase", () => ({
  getSupabase: () => null,
  isSupabaseConfigured: () => true,
  getSupabaseConfig: () => ({
    url: "https://test.supabase.co",
    anonKey: "test-key",
  }),
}));
