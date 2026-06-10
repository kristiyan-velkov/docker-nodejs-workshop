import { render, screen } from "@testing-library/react";
import { Hero } from "./index";

describe("Hero Component", () => {
  it("renders without crashing", () => {
    render(<Hero />);
    expect(screen.getByText(/Master/i)).toBeInTheDocument();
  });

  it("renders the Node.js logo label", () => {
    render(<Hero />);
    expect(screen.getByLabelText("Node.js logo")).toBeInTheDocument();
  });

  it("renders the Docker logo label", () => {
    render(<Hero />);
    expect(screen.getByLabelText("Docker logo")).toBeInTheDocument();
  });

  it("renders the main heading with correct text", () => {
    render(<Hero />);
    expect(screen.getByText(/Master/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Docker/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Node.js Congress 2026/i)).toBeInTheDocument();
  });

  it("renders the description paragraph", () => {
    render(<Hero />);
    expect(
      screen.getByText(
        /Containerize Express \+ Vite \+ PostgreSQL with production-ready/i
      )
    ).toBeInTheDocument();
  });

  it("renders the Start workshop button", () => {
    render(<Hero />);
    const startButton = screen.getByText("Start workshop");
    expect(startButton).toBeInTheDocument();
    expect(startButton.closest("a")).toHaveAttribute("href", "#workshop-materials");
  });

  it("renders the View documentation button with correct link", () => {
    render(<Hero />);
    const docButton = screen.getByText("View documentation");
    expect(docButton).toBeInTheDocument();
    expect(docButton.closest("a")).toHaveAttribute(
      "href",
      "https://docs.docker.com/guides/nodejs"
    );
    expect(docButton.closest("a")).toHaveAttribute("target", "_blank");
    expect(docButton.closest("a")).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("applies correct CSS classes to the header", () => {
    const { container } = render(<Hero />);
    const header = container.querySelector("header");
    expect(header).toHaveClass("relative");
    expect(header).toHaveClass("overflow-hidden");
    expect(header).toHaveClass("bg-white");
  });

  it("renders workshop stats", () => {
    render(<Hero />);
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("Workshop tasks")).toBeInTheDocument();
  });
});
