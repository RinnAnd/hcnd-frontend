import { FC, useState } from "react";
import { Product } from "./Products";
import { RequestWithToken } from "../utils/requests";

interface CreateProductProps {
  showCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

type InputProps = {
  placeholder: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  border: string
};

const Input = ({ placeholder, name, type, value, onChange, border }: InputProps) => {
  return (
    <div className="flex w-full items-center justify-center gap-3">
      <p className="w-1/6 text-sm text-center">{placeholder}</p>
      <input
        className={`bg-slate-400 h-9 p-2 text-black w-4/6 rounded-md ${border}`}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const CreateProduct: FC<CreateProductProps> = ({ showCreate }) => {
  const [fields, setFields] = useState<Omit<Product, "id">>({
    handle: "",
    title: "",
    description: "",
    sku: 0,
    grams: 0,
    stock: 0,
    price: 0,
    comparePrice: 0,
    barcode: "",
  });

  const [errorBorder, setErrorBorder] = useState(false);

  function validateFields() {
    for (const key in fields) {
      if (
        fields[key as keyof typeof fields] === "" ||
        fields[key as keyof typeof fields] === 0
      ) {
        return false;
      }
    }
    return true;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  }

  const token = JSON.parse(sessionStorage.getItem("token")!);

  async function handleSubmit() {
    if (!validateFields()) {
      setErrorBorder(true);
      return
    }
    const response = await RequestWithToken("product", "POST", token, fields);
    if (response?.status === 401) {
      alert("Parece que tu sesión ha caducado, por favor vuelve a iniciar sesión para realizar cambios.")
    }
    if (response?.status === 201) {
      showCreate(false);
    }
  }

  return (
    <div className="w-[25rem] h-[35rem]">
      <div className="bg-[#18181B] h-full flex flex-col p-4 gap-3 justify-around rounded-md items-center">
        <div className="text-center">
          <h1 className="text-xl">Formulario de creación de producto</h1>
          <p className="text-sm">Recuerda que todos los campos son necesarios</p>
        </div>
        <div className="flex flex-col gap-2 w-full justify-center items-center">
          <Input
            placeholder="Handle"
            name="handle"
            value={fields.handle}
            type="text"
            onChange={handleChange}
            border={errorBorder ? "border border-red-500" : ""}
          />
          <Input
            placeholder="Título"
            name="title"
            type="text"
            value={fields.title}
            onChange={handleChange}
            border={errorBorder ? "border border-red-500" : ""}
          />
          <Input
            placeholder="Descripción"
            name="description"
            type="text"
            value={fields.description}
            onChange={handleChange}
            border={errorBorder ? "border border-red-500" : ""}
          />
          <Input
            placeholder="Sku"
            name="sku"
            type="number"
            value={fields.sku}
            onChange={handleChange}
            border={errorBorder ? "border border-red-500" : ""}
          />
          <Input
            placeholder="Gramos"
            name="grams"
            type="number"
            value={fields.grams}
            onChange={handleChange}
            border={errorBorder ? "border border-red-500" : ""}
          />
          <Input
            placeholder="Stock"
            name="stock"
            type="number"
            value={fields.stock}
            onChange={handleChange}
            border={errorBorder ? "border border-red-500" : ""}
          />
          <Input
            placeholder="Precio"
            name="price"
            type="number"
            value={fields.price}
            onChange={handleChange}
            border={errorBorder ? "border border-red-500" : ""}
          />
          <Input
            placeholder="Precio referencia"
            name="comparePrice"
            type="number"
            value={fields.comparePrice}
            onChange={handleChange}
            border={errorBorder ? "border border-red-500" : ""}
          />
          <Input
            placeholder="Código de barras"
            name="barcode"
            type="number"
            value={fields.barcode}
            onChange={handleChange}
            border={errorBorder ? "border border-red-500" : ""}
          />
        </div>
        <div className="flex gap-5">
          <button
            className="bg-[#404deb] px-3 py-2 rounded-md font-semibold flex gap-2 w-fit"
            onClick={handleSubmit}
          >
            Crear
          </button>
          <button
            className="bg-[#5d75f7] px-3 py-2 rounded-md font-semibold flex gap-2 w-fit"
            onClick={() => showCreate(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
