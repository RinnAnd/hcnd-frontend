import { FC, useState } from "react";
import { Product } from "./Products";
import { moneyFormatter } from "../utils/formatter";
import { Delete, Edit, Hover } from "./Icons";
import { AnimatePresence, motion } from "framer-motion";
import Tag from "../utils/floating-tag";

interface ProductCardProps {
  product: Product;
  setCurrentProduct: React.Dispatch<React.SetStateAction<Product | null>>
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setProductId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ProductCard: FC<ProductCardProps> = ({ product, setCurrentProduct, setOpenDelete, setProductId }) => {
  const [show, setShow] = useState<boolean>(false);
  const [showTag, setShowTag] = useState({
    edit: false,
    delete: false,
  });

  return (
    <motion.div
      className="border border-gray-600 p-4 bg-[#18181B] w-[20rem] rounded-md flex flex-col items-center justify-evenly relative h-56"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="font-bold text-lg text-center">{product.title}</h1>
      <div
        className="relative w-full flex flex-col items-center cursor-pointer"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <div className="bg-[#404deb] px-3 py-2 rounded-md font-semibold flex gap-2 w-fit">
          <Hover /> Descripción
        </div>
        <AnimatePresence>
          {show && (
            <motion.div
              className="text-gray-800 absolute w-full bg-[#c5d8ff] top-full left-1/2 transform -translate-x-1/2 z-10 p-3 max-h-72 overflow-y-scroll rounded-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p>{moneyFormatter(product.price)}</p>
      <div className="absolute bottom-2 right-2 flex gap-4 items-center">
        <div className="flex flex-col items-center">
          <button
            onMouseEnter={() => setShowTag({ ...showTag, edit: true })}
            onMouseLeave={() => setShowTag({ ...showTag, edit: false })}
            onClick={() => setCurrentProduct(product)}
          >
            <Edit />
          </button>
          {showTag.edit && <Tag text="Editar" />}
        </div>
        <div className="flex flex-col items-center">
          <button
            onMouseEnter={() => setShowTag({ ...showTag, delete: true })}
            onMouseLeave={() => setShowTag({ ...showTag, delete: false })}
            onClick={() => {
              setOpenDelete(true)
              setProductId(product.id)
            }}
          >
            <Delete />
          </button>
          {showTag.delete && <Tag text="Eliminar" />}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
