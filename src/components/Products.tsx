import { FC, useEffect, useState } from "react";
import { Request, RequestWithToken } from "../utils/requests";
import ProductCard from "./ProductCard";
import { AddProduct, Logout } from "./Icons";
import Tag from "../utils/floating-tag";
import EditProduct from "./EditProduct";
import DeleteWarning from "./DeleteWarning";
import CreateProduct from "./CreateProduct";

interface ProductsProps {}

export type Product = {
  id: number;
  handle: string;
  title: string;
  description: string;
  sku: number;
  grams: number;
  stock: number;
  price: number;
  comparePrice: number;
  barcode: string;
};

const Products: FC<ProductsProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showTag, setShowTag] = useState<boolean>(false);
  const [showAddTag, setShowAddTag] = useState<boolean>(false);
  const [productId, setProductId] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [showCount, setShowCount] = useState<number>(6);

  const loadMore = () => {
    setShowCount((prevShowCount) => prevShowCount + 6);
  };

  const currentUser = JSON.parse(sessionStorage.getItem("user")!);

  const logOut = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    window.location.reload();
  };

  async function handleDelete(id: number) {
    const token = JSON.parse(sessionStorage.getItem("token")!);
    console.log(token);
    const response = await RequestWithToken(`product/${id}`, "DELETE", token);
    if (response?.status === 401) {
      alert(
        "Parece que tu sesión ha caducado, por favor vuelve a iniciar sesión para realizar cambios."
      );
    }
    if (response?.status === 200) {
      window.location.reload();
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await Request("product", "GET");
      const data = (await response?.json()) as Product[];
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full relative flex flex-col items-center">
      <div className="w-full flex items-center p-6 flex-col">
        <div className="absolute top-24 left-10 flex flex-col items-center">
          <button
            onMouseEnter={() => setShowAddTag(true)}
            onMouseLeave={() => setShowAddTag(false)}
            onClick={() => setShowCreate(true)}
          >
            <AddProduct />
          </button>
          {showAddTag && <Tag text="Agregar producto" />}
        </div>
        {showCreate && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <CreateProduct showCreate={setShowCreate} />
            </div>
          </>
        )}
        <div className="absolute right-2 top-8 flex flex-col items-center">
          <button
            className="bg-[#404deb] p-2 rounded-full aspect-square shadow-xl"
            onMouseEnter={() => setShowTag(true)}
            onMouseLeave={() => setShowTag(false)}
            onClick={logOut}
          >
            <Logout />
          </button>
          {showTag && <Tag text="Cerrar sesión" />}
        </div>
        <h1 className="text-3xl">!Hola, {currentUser}!</h1>
        <p>Aquí tienes todos los productos disponibles.</p>
      </div>
      {currentProduct && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <EditProduct
              product={currentProduct}
              setCurrentProduct={setCurrentProduct}
            />
          </div>
        </>
      )}
      {openDelete && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <DeleteWarning
              deleteFn={handleDelete}
              id={productId!}
              close={setOpenDelete}
            />
          </div>
        </>
      )}
      <div className="flex flex-wrap gap-3 w-full justify-center p-4">
        {products?.slice(0, showCount).map((prd: Product) => (
          <ProductCard
            key={prd.id}
            product={prd}
            setCurrentProduct={setCurrentProduct}
            setOpenDelete={setOpenDelete}
            setProductId={setProductId}
          />
        ))}
      </div>
      {showCount < products.length && (
        <button
          onClick={loadMore}
          className="bg-[#404deb] px-3 py-2 rounded-md font-semibold flex gap-2 w-fit mb-14"
        >
          Ver más
        </button>
      )}
    </div>
  );
};

export default Products;
