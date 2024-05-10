import { FC } from "react";
import { Product } from "./Products";
import { useState } from "react";
import { RequestWithToken } from "../utils/requests";

interface EditProductProps {
  product: Product | null;
  setCurrentProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}

const Input = ({
  placeholder,
  value,
  type,
  name,
  onChange,
}: {
  placeholder: string;
  value: string | number | undefined;
  type: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex w-full items-center justify-center gap-3">
      <p className="w-1/6 text-sm text-center">{placeholder}</p>
      <input
        className="bg-slate-400 h-9 p-2 text-black w-4/6 rounded-md"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const EditProduct: FC<EditProductProps> = ({ product, setCurrentProduct }) => {
  const token = JSON.parse(sessionStorage.getItem("token")!);
  const [fields, setFields] = useState<Product | null>(product);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!fields) return;
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const descriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!fields) return;
    setFields({
      ...fields,
      description: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (fields === product) return;
    if (!fields) return;
    const response = await RequestWithToken(`product/${fields?.id}`, "PUT", token!, fields);
    if (response?.status === 401) {
      alert("Parece que tu sesión ha caducado, por favor vuelve a iniciar sesión para realizar cambios.")
    }
    if (response?.status === 200) {
      setCurrentProduct(null);
    }
  }

  return (
    <div className="w-[27rem] h-[37rem]">
      <div className="bg-[#18181B] h-full flex flex-col p-4 gap-3 justify-around rounded-md items-center">
        <h2 className="text-xl">Editar este producto</h2>
        <Input
          placeholder="Handle"
          value={fields?.handle}
          type="text"
          name="handle"
          onChange={handleChange}
        />
        <Input
          placeholder="Título"
          value={fields?.title}
          type="text"
          name="title"
          onChange={handleChange}
        />
        <div className="flex w-full items-center justify-center gap-4">
          <p className="w-1/6 text-sm text-center">Descripción</p>
          <textarea
            className="bg-slate-400 h-20 text-black w-4/6 rounded-md p-2 resize-none"
            placeholder="Descripción"
            value={fields?.description}
            name="description"
            onChange={descriptionChange}
          />
        </div>
        <Input
          placeholder="Precio"
          value={fields?.price}
          type="number"
          name="price"
          onChange={handleChange}
        />
        <Input
          placeholder="Stock"
          value={fields?.stock}
          type="number"
          name="stock"
          onChange={handleChange}
        />
        <Input
          placeholder="SKU"
          value={fields?.sku}
          type="number"
          name="sku"
          onChange={handleChange}
        />
        <Input
          placeholder="Gramos"
          value={fields?.grams}
          type="number"
          name="grams"
          onChange={handleChange}
        />
        <Input
          placeholder="Precio referencia"
          value={fields?.comparePrice}
          type="number"
          name="comparePrice"
          onChange={handleChange}
        />
        <Input
          placeholder="Código de barras"
          value={fields?.barcode}
          type="number"
          name="barcode"
          onChange={handleChange}
        />
        <div className="w-full flex gap-4 justify-center items-center">
          <button className="bg-[#404deb] px-3 py-2 rounded-md font-semibold flex gap-2 w-fit"
            onClick={handleSubmit}
          >
            Guardar
          </button>
          <button
            className="bg-[#5d75f7] px-3 py-2 rounded-md font-semibold flex gap-2 w-fit"
            onClick={() => setCurrentProduct(null)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
