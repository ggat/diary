import { render, screen } from "@testing-library/react";
import Front from "./Front";

test.skip("renders learn react link", () => {
    render(<Front />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
