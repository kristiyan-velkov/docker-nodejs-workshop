import { render, screen } from "@testing-library/react";
import { useState } from "react";
import App from "./App";
import { QuickStart } from "./components/QuickStart";

function TestQuickStart() {
  const [activeTab, setActiveTab] = useState<"tasks">("tasks");
  return <QuickStart activeTab={activeTab} onTabChange={setActiveTab} />;
}

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
    const workshopTexts = screen.getAllByText(/Node.js Docker Workshop/i);
    expect(workshopTexts.length).toBeGreaterThan(0);
  });

  it("renders all major sections", () => {
    render(<App />);

    const congressTexts = screen.getAllByText(/Node.js Congress 2026/i);
    expect(congressTexts.length).toBeGreaterThan(0);

    expect(screen.getByText(/Workshop Learning Objectives/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Workshop Materials/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Kristiyan Velkov/i).length).toBeGreaterThan(0);
  });

  it("renders the main container with correct classes", () => {
    const { container } = render(<App />);
    const mainDiv = container.querySelector(".min-h-screen");
    expect(mainDiv).toBeInTheDocument();
  });
});

describe("QuickStart with controlled tabs", () => {
  it("renders workshop tasks tab", () => {
    render(<TestQuickStart />);
    expect(screen.getByRole("heading", { name: /Step-by-step tasks/i })).toBeInTheDocument();
  });
});
