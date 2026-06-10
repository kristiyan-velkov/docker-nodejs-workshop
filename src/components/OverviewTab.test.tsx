import { render, screen } from "@testing-library/react";
import { OverviewTab } from "./index";

describe("OverviewTab Component", () => {
  it("renders without crashing", () => {
    render(<OverviewTab />);
    expect(screen.getByText(/Docker Files/i)).toBeInTheDocument();
  });

  it("renders Docker Files section", () => {
    render(<OverviewTab />);
    expect(screen.getByText(/🎯 Docker Files/i)).toBeInTheDocument();
    expect(screen.getByText(/Dockerfile.development/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Multi-stage production build \(Express/i)
    ).toBeInTheDocument();
  });

  it("renders all Docker file items", () => {
    render(<OverviewTab />);
    const dockerfiles = screen.getAllByText(/Dockerfile/i);
    expect(dockerfiles.length).toBeGreaterThanOrEqual(3);
    expect(screen.getByText(/Dockerfile.development/i)).toBeInTheDocument();
    expect(screen.getByText(/Dockerfile.test/i)).toBeInTheDocument();
    expect(screen.getByText(/compose.yml/i)).toBeInTheDocument();
    expect(screen.getByText(/.env.example/i)).toBeInTheDocument();
  });

  it("renders Tech Stack section", () => {
    render(<OverviewTab />);
    expect(screen.getByText(/🔧 Tech Stack/i)).toBeInTheDocument();
  });

  it("renders all tech stack items", () => {
    render(<OverviewTab />);
    expect(screen.getByText(/Express 5 \+ React 19/i)).toBeInTheDocument();
    expect(screen.getByText(/Vite client \+ esbuild/i)).toBeInTheDocument();
    expect(screen.getByText(/PostgreSQL 16/i)).toBeInTheDocument();
    expect(screen.getByText(/Node.js 24.16.0 Alpine/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Vitest, Docker Compose Watch/i)
    ).toBeInTheDocument();
  });

  it("renders content in grid layout", () => {
    const { container } = render(<OverviewTab />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("md:grid-cols-2");
  });

  it("applies correct CSS classes to content boxes", () => {
    const { container } = render(<OverviewTab />);
    const contentBoxes = container.querySelectorAll(".bg-gray-50.p-8");
    expect(contentBoxes.length).toBe(2);
    contentBoxes.forEach((box) => {
      expect(box).toHaveClass("rounded-2xl");
      expect(box).toHaveClass("border-l-4");
    });
  });

  it("renders list items with proper styling", () => {
    const { container } = render(<OverviewTab />);
    const listItems = container.querySelectorAll("li");
    expect(listItems.length).toBeGreaterThan(0);
    listItems.forEach((item) => {
      expect(item).toHaveClass("text-gray-700");
    });
  });
});
