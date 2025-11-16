import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../Register";
import { vi } from "vitest";


// Mock de useNavigate

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});


// TEST REGISTRO EXITOSO

test("registro exitoso navega al login y muestra alerta", async () => {
  // Mock para manejar doble render de React StrictMode
  const mockFetch = vi.fn()
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

  global.fetch = mockFetch;

  // Mock alert()
  const mockAlert = vi.fn();
  global.alert = mockAlert;

  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/nombre/i), { target: { value: "Juan" } });
  fireEvent.change(screen.getByPlaceholderText(/apellido/i), { target: { value: "Mitre" } });
  fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), {
    target: { value: "juanceto01@gmail.com" },
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

  await waitFor(() => {
    expect(mockAlert).toHaveBeenCalledWith("Usuario registrado con éxito");
  });

  expect(mockNavigate).toHaveBeenCalledWith("/login");

  expect(mockFetch).toHaveBeenCalledTimes(1);

});
