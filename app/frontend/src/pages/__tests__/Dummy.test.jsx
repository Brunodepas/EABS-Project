import { render, screen } from "@testing-library/react";

function Dummy() {
  return <h1>Hola mundo</h1>;
}

test("renderiza Hola mundo", () => {
  render(<Dummy />);
  expect(screen.getByText("Hola mundo")).toBeInTheDocument();
});
