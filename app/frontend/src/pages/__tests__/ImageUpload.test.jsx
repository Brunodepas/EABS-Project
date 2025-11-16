import { render, screen } from "@testing-library/react";
import ImageUpload from "../ImageUpload";

test("la página se inicializa correctamente", () => {
  render(<ImageUpload />);

  expect(
    screen.getByText(/Sube una foto de tu planta/i)
  ).toBeInTheDocument();

  expect(
    screen.getByText(/Seleccionar imagen/i)
  ).toBeInTheDocument();
});
