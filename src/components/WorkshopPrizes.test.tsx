import { render, screen } from "@testing-library/react";
import { WorkshopPrizes } from "./WorkshopPrizes";
import { BOOK_PRIZE } from "../constants/bookPrize";

describe("WorkshopPrizes", () => {
  it("renders book title and prize tiers", () => {
    render(<WorkshopPrizes />);

    expect(screen.getByText(BOOK_PRIZE.title)).toBeInTheDocument();
    expect(screen.getByText("1st place")).toBeInTheDocument();
    expect(screen.getByText("2nd place")).toBeInTheDocument();
    expect(screen.getByText("3rd place")).toBeInTheDocument();
    expect(screen.getByText("Free book")).toBeInTheDocument();
    expect(screen.getByText("90% off")).toBeInTheDocument();
    expect(screen.getByText("80% off")).toBeInTheDocument();
  });

  it("links to dockerfrontend.com", () => {
    render(<WorkshopPrizes />);

    const links = screen.getAllByRole("link", {
      name: /dockerfrontend\.com/i,
    });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute("href", BOOK_PRIZE.url);
  });

  it("renders book cover image", () => {
    render(<WorkshopPrizes />);

    const image = screen.getByRole("img", {
      name: new RegExp(BOOK_PRIZE.title, "i"),
    });
    expect(image).toHaveAttribute("src", BOOK_PRIZE.imageUrl);
  });
});
