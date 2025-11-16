import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ImageUpload from "../ImageUpload";

//TEST INICIALIZACION

test("la página se inicializa correctamente", () => {
  render(<ImageUpload />);

  expect(
    screen.getByText(/Sube una foto de tu planta/i)
  ).toBeInTheDocument();

  expect(
    screen.getByText(/Seleccionar imagen/i)
  ).toBeInTheDocument();
});

//TEST CARGAR IMAGEN Y MOSTRAR RESULTADOS

test("cargar una imagen y mostrar los resultados", async () => {
  // mockeamos fileReader para leer una imagen ficticia
  class MockFileReader {
    constructor() {
      this.onloadend = null;
      this.result = null;
    }
    readAsDataURL() {
      this.result = "data:image/png;base64,MOCK_IMAGE";
      this.onloadend && this.onloadend();
    }
  }
  global.FileReader = MockFileReader;

  // mockeamos fetch para devolver un resultado
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          planta: "Tomate",
          enfermedad: "Mancha bacteriana del tomate",
          confianza: "90%",
          recomendacion:
            "Evitar el riego por aspersión y aplicar bactericidas a base de cobre.",
        }),
    })
  );

  render(<ImageUpload />);

  const fileInput = screen.getByLabelText(/Seleccionar imagen/i, {
    selector: "input",
  });

  const fakeFile = new File(["dummy"], "plantita.png", { type: "image/png" });
  fireEvent.change(fileInput, { target: { files: [fakeFile] } });

  expect(fetch).toHaveBeenCalledTimes(1);

  expect(await screen.findByRole("heading",{ name: /Tomate/i }) //hay emoji antes
  ).toBeInTheDocument();

  expect(
    screen.getByText(/Mancha bacteriana del tomate/i)
  ).toBeInTheDocument();

  expect(screen.getByText(/90%/i)).toBeInTheDocument();

  expect(screen.getByText(/Evitar el riego por aspersión y aplicar bactericidas a base de cobre./i)).toBeInTheDocument();

});

//TEST BOTON ANALIZAR OTRA PLANTA

test("probamos el boton Analizar otra planta", async () => {

  class MockFileReader {
    constructor() {
      this.onloadend = null;
      this.result = null;
    }
    readAsDataURL() {
      this.result = "data:image/png;base64,MOCK_IMAGE";
      this.onloadend && this.onloadend();
    }
  }
  global.FileReader = MockFileReader;

  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          planta: "Tomate",
          enfermedad: "Mancha bacteriana del tomate",
          confianza: "90%",
          recomendacion:
            "Evitar el riego por aspersión y aplicar bactericidas a base de cobre.",
        }),
    })
  );

  render(<ImageUpload />);

  const fileInput = screen.getByLabelText(/Seleccionar imagen/i, {selector: "input",});

  const fakeFile = new File(["dummy"], "plantita.png", { type: "image/png" });

  fireEvent.change(fileInput, { target: { files: [fakeFile] } });

  // Resultados de la imagen subida

    expect(await screen.findByRole("heading",{ name: /Tomate/i }) //hay emoji antes
  ).toBeInTheDocument();

  expect(screen.getByText(/Mancha bacteriana del tomate/i)).toBeInTheDocument();

  expect(screen.getByText(/90%/i)).toBeInTheDocument();
  
  expect(screen.getByText(/Evitar el riego por aspersión y aplicar bactericidas a base de cobre./i)).toBeInTheDocument();

  const AnalizarOtra = screen.getByRole("button", {name: /Analizar otra planta/i,});

  fireEvent.click(AnalizarOtra); // probamos el boton 

  // Esperamos que se vea asi 

  expect(screen.getByText(/Sube una foto de tu planta/i)).toBeInTheDocument();

  expect(screen.getByText(/Seleccionar imagen/i)).toBeInTheDocument();

  // Los resultados anteriores debe desaparecer

  expect(screen.queryByText(/Tomate/i)).not.toBeInTheDocument();

  expect(screen.queryByText(/90%/i)).not.toBeInTheDocument();

  expect(screen.queryByText(/Mancha bacteriana del tomate/i)).not.toBeInTheDocument();

  expect(screen.queryByText(/Evitar el riego por aspersión y aplicar bactericidas a base de cobre./i)).not.toBeInTheDocument();

});

//TEST ERROR EN PREDICCION

test("probamos cuando el backend devuelve un error en una prediccion", async () => {

  class MockFileReader {
    constructor() {
      this.onloadend = null;
      this.result = null;
    }
    readAsDataURL() {
      this.result = "data:image/png;base64,MOCK_IMAGE";
      this.onloadend && this.onloadend();
    }
  }
  global.FileReader = MockFileReader;

  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          error: "Imagen inválida",
        }),
    })
  );

  render(<ImageUpload />);

  const fileInput = screen.getByLabelText(/Seleccionar imagen/i, {selector: "input",});

  const fakeFile = new File(["dummy"], "planta.png", { type: "image/png" });

  fireEvent.change(fileInput, { target: { files: [fakeFile] } });

  expect(fetch).toHaveBeenCalledTimes(1);

  expect(
    await screen.findByText(/Imagen inválida/i, {}, { timeout: 3000 })
  ).toBeInTheDocument();

});

