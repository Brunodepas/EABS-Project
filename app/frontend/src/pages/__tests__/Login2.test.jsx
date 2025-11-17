import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";
import { vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});


// TEST LOGIN EXITOSO

test("login exitoso navega al home", async () => {
  mockNavigate.mockReset();

  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  });

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/correo electrónico/i), {
    target: { value: "juanceto01@mail.com" },
  });

  fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
    target: { value: "123456" },
  });

  fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

  await waitFor(() => {
  expect(mockNavigate).toHaveBeenCalledWith("/home");   
  });
   

  expect(mockNavigate).toHaveBeenCalledWith("/home");
  expect(mockNavigate).toHaveBeenCalledTimes(1);

});
