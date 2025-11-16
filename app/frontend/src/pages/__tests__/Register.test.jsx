import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../Register";
import { vi } from "vitest";

//TEST INICIALIZACION

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

//TEST CAMPOS VACIOS

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

// TEST CONTRASENIAS DISTINTAS


test("muestra alerta cuando las contraseñas no son iguales", async () => {

  const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

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

  const BotonRegistrarme = screen.getByRole("button", { name: /registrarme/i });

  // apretamos registrarme
  fireEvent.click(BotonRegistrarme);
  
  expect(alertMock).toHaveBeenCalledWith("Las contraseñas no coinciden.");
});

// TEST MAIL INVALIDO

test("muestra alerta si el mail no es valido", () => {
  vi.spyOn(window, "alert").mockImplementation(() => {});

  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/nombre/i), {
    target: { value: "Juan" },
  });

  fireEvent.change(screen.getByPlaceholderText(/apellido/i), {
    target: { value: "Mitre" },
  });

  fireEvent.change(screen.getByPlaceholderText(/correo/i), {
    target: { value: "juancetomailcom" }, // email inválido
  });

  fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
    target: { value: "123456" },
  });

  fireEvent.change(screen.getByPlaceholderText("Confirmar contraseña"), {
    target: { value: "123456" },
  });

  const BotonRegistrarme = screen.getByRole("button", { name: /registrarme/i });

  // apretamos registrarme
  fireEvent.click(BotonRegistrarme);

  expect(window.alert).toHaveBeenCalledWith("Ingresá un email válido.");

});
