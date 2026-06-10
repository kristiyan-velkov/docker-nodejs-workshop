import { render, screen } from "@testing-library/react";
import { FeatureCard } from "./index";
import type { Feature } from "../types";

describe("FeatureCard Component", () => {
  const mockFeature: Feature = {
    icon: "container",
    title: "Docker Containerization",
    description: "Seamlessly package your Node.js full-stack app with Docker",
  };

  it("renders without crashing", () => {
    render(<FeatureCard feature={mockFeature} index={0} />);
    expect(screen.getByText(mockFeature.title)).toBeInTheDocument();
  });

  it("renders the feature icon container", () => {
    const { container } = render(<FeatureCard feature={mockFeature} index={0} />);
    expect(container.querySelector(".lucide-container")).toBeInTheDocument();
  });

  it("renders the feature title", () => {
    render(<FeatureCard feature={mockFeature} index={0} />);
    const title = screen.getByText(mockFeature.title);
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe("H3");
  });

  it("renders the feature description", () => {
    render(<FeatureCard feature={mockFeature} index={0} />);
    expect(screen.getByText(mockFeature.description)).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(
      <FeatureCard feature={mockFeature} index={0} />
    );
    const card = container.querySelector(".rounded-2xl.border.border-slate-200");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("bg-white");
    expect(card).toHaveClass("shadow-sm");
  });

  it("renders accent bar with color based on index", () => {
    const { container } = render(
      <FeatureCard feature={mockFeature} index={2} />
    );
    const accent = container.querySelector(".bg-sky-500");
    expect(accent).toBeInTheDocument();
  });

  it("renders with different feature data", () => {
    const anotherFeature: Feature = {
      icon: "zap",
      title: "Lightning Fast",
      description: "Built with Vite for instant HMR",
    };
    const { container } = render(<FeatureCard feature={anotherFeature} index={1} />);
    expect(container.querySelector(".lucide-zap")).toBeInTheDocument();
    expect(screen.getByText(anotherFeature.title)).toBeInTheDocument();
    expect(screen.getByText(anotherFeature.description)).toBeInTheDocument();
  });
});
