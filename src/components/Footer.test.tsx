import { render, screen } from "@testing-library/react";
import { SOCIAL_LINKS } from "../constants/data";
import { Footer } from "./index";

describe("Footer Component", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    expect(screen.getAllByText(/Node.js Docker Workshop/i).length).toBeGreaterThan(0);
  });

  it("renders the author name", () => {
    render(<Footer />);
    expect(screen.getByText("Kristiyan Velkov")).toBeInTheDocument();
  });

  it("renders the LinkedIn link correctly", () => {
    render(<Footer />);
    const linkedinLink = screen.getByText("LinkedIn");
    expect(linkedinLink.closest("a")).toHaveAttribute("href", SOCIAL_LINKS.linkedin);
    expect(linkedinLink.closest("a")).toHaveAttribute("target", "_blank");
    expect(linkedinLink.closest("a")).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the Resources section", () => {
    render(<Footer />);
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("renders the Newsletter link", () => {
    render(<Footer />);
    const newsletterLink = screen.getByText("Frontend World Newsletter");
    expect(newsletterLink).toBeInTheDocument();
    expect(newsletterLink.closest("a")).toHaveAttribute(
      "href",
      SOCIAL_LINKS.newsletter
    );
    expect(newsletterLink.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("renders the sample app link", () => {
    render(<Footer />);
    const sampleLink = screen.getByText("Sample App");
    expect(sampleLink).toBeInTheDocument();
    expect(sampleLink.closest("a")).toHaveAttribute("href", SOCIAL_LINKS.sampleApp);
    expect(sampleLink.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("renders the Docker Node.js guide link", () => {
    render(<Footer />);
    const docsLink = screen.getByText("Docker Node.js Guide");
    expect(docsLink).toBeInTheDocument();
    expect(docsLink.closest("a")).toHaveAttribute("href", SOCIAL_LINKS.documentation);
    expect(docsLink.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("renders the Support links", () => {
    render(<Footer />);
    expect(screen.getByText("Donate via Stripe")).toBeInTheDocument();
    expect(screen.getByText("GitHub Sponsors")).toBeInTheDocument();
  });

  it("renders the Stripe donation link", () => {
    render(<Footer />);
    const donateLink = screen.getByText("Donate via Stripe");
    expect(donateLink.closest("a")).toHaveAttribute("href", SOCIAL_LINKS.donate);
    expect(donateLink.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("renders the GitHub Sponsors link", () => {
    render(<Footer />);
    const sponsorsLink = screen.getByText("GitHub Sponsors");
    expect(sponsorsLink.closest("a")).toHaveAttribute("href", SOCIAL_LINKS.githubSponsors);
    expect(sponsorsLink.closest("a")).toHaveAttribute("target", "_blank");
  });

  it("renders the copyright text", () => {
    render(<Footer />);
    expect(screen.getAllByText(/Kristiyan Velkov/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/MIT License/i)).toBeInTheDocument();
  });

  it("renders in a grid layout", () => {
    const { container } = render(<Footer />);
    const grid = container.querySelector(".grid.gap-12.lg\\:grid-cols-2");
    expect(grid).toBeInTheDocument();
  });

  it("applies correct CSS classes to footer", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toHaveClass("bg-slate-50");
    expect(footer).toHaveClass("border-t");
    expect(footer).toHaveClass("border-slate-200");
  });

  it("all external links have correct attributes", () => {
    const { container } = render(<Footer />);
    const links = container.querySelectorAll('a[target="_blank"]');
    links.forEach((link) => {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
