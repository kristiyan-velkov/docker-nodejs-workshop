import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";
import { QuickStart } from "./index";
import type { TabType } from "../types";

function QuickStartHarness({ initialTab = "tasks" }: { initialTab?: TabType }) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  return <QuickStart activeTab={activeTab} onTabChange={setActiveTab} />;
}

describe("QuickStart Component", () => {
  it("renders without crashing", () => {
    render(<QuickStartHarness />);
    expect(screen.getByRole("heading", { name: /Workshop Materials/i })).toBeInTheDocument();
  });

  it("renders the main heading", () => {
    render(<QuickStartHarness />);
    const heading = screen.getByRole("heading", { name: /Workshop Materials/i });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  });

  it("renders all tab buttons", () => {
    render(<QuickStartHarness />);
    expect(screen.getByText("Workshop Tasks")).toBeInTheDocument();
    expect(screen.getByText("Learn")).toBeInTheDocument();
    expect(screen.getByText("Ask Question")).toBeInTheDocument();
    expect(screen.getByText("My Profile")).toBeInTheDocument();
    expect(screen.getByText("Docker Concepts")).toBeInTheDocument();
    expect(screen.getByText("Commands Reference")).toBeInTheDocument();
    expect(screen.getByText("Project Overview")).toBeInTheDocument();
    expect(screen.getByText("Quick Commands")).toBeInTheDocument();
  });

  it("shows Workshop Tasks tab by default", () => {
    render(<QuickStartHarness />);
    expect(screen.getByRole("heading", { name: /Step-by-step tasks/i })).toBeInTheDocument();
    expect(screen.getByText(/Get the Sample Application/i)).toBeInTheDocument();
  });

  it("switches to Commands Reference tab when clicked", () => {
    render(<QuickStartHarness />);
    fireEvent.click(screen.getByText("Commands Reference"));
    expect(screen.getByText(/Image Commands/i)).toBeInTheDocument();
  });

  it("switches to Project Overview tab when clicked", () => {
    render(<QuickStartHarness />);
    fireEvent.click(screen.getByText("Project Overview"));
    expect(screen.getByText(/Docker Files/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Stack/i)).toBeInTheDocument();
  });

  it("switches to Quick Commands tab when clicked", () => {
    render(<QuickStartHarness />);
    fireEvent.click(screen.getByText("Quick Commands"));
    const devServerTexts = screen.getAllByText(/Start Development Stack/i);
    expect(devServerTexts.length).toBeGreaterThan(0);
  });

  it("applies active styles to the Workshop Tasks button by default", () => {
    render(<QuickStartHarness />);
    const tasksButton = screen.getByText("Workshop Tasks");
    expect(tasksButton).toHaveClass("bg-indigo-600");
  });

  it("applies active styles to the clicked tab button", () => {
    render(<QuickStartHarness />);
    const commandsRefButton = screen.getByText("Commands Reference");
    fireEvent.click(commandsRefButton);
    expect(commandsRefButton.className).toContain("bg-indigo-600");
  });

  it("applies correct CSS classes to section", () => {
    const { container } = render(<QuickStartHarness />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("py-20");
    expect(section).toHaveClass("bg-white");
  });
});
