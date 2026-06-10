import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthGate } from "./components/AuthGate";
import { AppRoutes } from "./App";

function renderApp(initialRoute = "/") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthGate>
        <AppRoutes />
      </AuthGate>
    </MemoryRouter>
  );
}

describe("App Component", () => {
  it("renders without crashing", () => {
    renderApp();
    const workshopTexts = screen.getAllByText(/Docker/i);
    expect(workshopTexts.length).toBeGreaterThan(0);
  });

  it("renders home page sections", () => {
    renderApp();

    const congressTexts = screen.getAllByText(/Node.js Congress 2026/i);
    expect(congressTexts.length).toBeGreaterThan(0);

    expect(screen.getByText(/Workshop Learning Objectives/i)).toBeInTheDocument();
    expect(screen.getByText(/Workshop sections/i)).toBeInTheDocument();
    expect(screen.getByText(/Workshop prize challenge/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Kristiyan Velkov/i).length).toBeGreaterThan(0);
  });

  it("renders learn index page", () => {
    renderApp("/learn");
    expect(screen.getByText(/Docker Knowledge Base/i)).toBeInTheDocument();
    expect(screen.getByText(/Docker Image/i)).toBeInTheDocument();
  });

  it("renders tasks page", () => {
    renderApp("/tasks");
    expect(screen.getByRole("heading", { name: /Workshop Tasks/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Step-by-step tasks/i })).toBeInTheDocument();
  });

  it("renders commands reference page", () => {
    renderApp("/learn/commands");
    expect(screen.getByRole("heading", { name: /Commands Reference/i })).toBeInTheDocument();
    expect(screen.getByText(/Image Commands/i)).toBeInTheDocument();
  });
});
