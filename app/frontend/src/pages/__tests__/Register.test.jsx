import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../Register";
import { vi } from "vitest";

test("Inicializacion de Register", () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /crear cuenta/i })).toBeInTheDocument();

  expect(screen.getByPlaceholderText(/nombre/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/apellido/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/correo electrónico/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Confirmar contraseña")).toBeInTheDocument();

  // chequea botones
  expect(
    screen.getByRole("button", { name: /registrarme/i })
  ).toBeInTheDocument();

  // chequea link a iniciar sesion
  expect(
    screen.getByRole("link", { name: /iniciar sesión/i })
  ).toBeInTheDocument();

  // chequea imagenes
  const profilePics = screen.getAllByRole("img");
  expect(profilePics.length).toBeGreaterThanOrEqual(5);


});

test("muestra alerta si hay campos vacios", async () => {

  const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  //no llenamos campos//

  const BotonRegistrarme = screen.getByRole("button", { name: /registrarme/i });

  fireEvent.click(BotonRegistrarme);

  expect(alertMock).toHaveBeenCalledWith("Por favor, completa todos los campos.");

});

test("muestra alerta cuando las contraseñas no son iguales", async () => {

  const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
  const fetchMock = vi.spyOn(global, "fetch").mockImplementation(() => {});

  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/Nombre/i), {
    target: { value: "Juan" },
  });

  fireEvent.change(screen.getByPlaceholderText(/Apellido/i), {
    target: { value: "Mitre" },
  });

  fireEvent.change(screen.getByPlaceholderText(/Correo electrónico/i), {
    target: { value: "juanceto01@gmail.com" },
  });

  //contrasenias distintas
  fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
    target: { value: "123456" },
  });

  fireEvent.change(screen.getByPlaceholderText("Confirmar contraseña"), {
    target: { value: "abcdef" },
  });

  // apretamos registrarme
  fireEvent.click(screen.getByRole("button", { name: /registrarme/i }));

  expect(alertMock).toHaveBeenCalledWith("Las contraseñas no coinciden.");
});
