import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
    // Use getAllByText since text appears multiple times
    const workshopTexts = screen.getAllByText(/Node.js Docker Workshop/i);
    expect(workshopTexts.length).toBeGreaterThan(0);
  });

  it("renders all major sections", () => {
    render(<App />);
    
    const congressTexts = screen.getAllByText(/Node.js Congress 2026/i);
    expect(congressTexts.length).toBeGreaterThan(0);
    
    // Features section
    expect(screen.getByText(/Workshop Learning Objectives/i)).toBeInTheDocument();
    
    // Workshop Materials section
    expect(screen.getByText(/Workshop Materials/i)).toBeInTheDocument();
    
    // Footer section
    expect(screen.getByText(/Created by/i)).toBeInTheDocument();
  });

  it("renders the main container with correct classes", () => {
    const { container } = render(<App />);
    const mainDiv = container.querySelector(".min-h-screen");
    expect(mainDiv).toBeInTheDocument();
  });
});

