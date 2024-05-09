import { FC } from "react";

interface DeleteWarningProps {
  deleteFn: (id: number) => Promise<void>;
  id: number;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteWarning: FC<DeleteWarningProps> = ({ deleteFn, id, close }) => {
  return (
    <div className="w-[20rem] h-[12rem]">
      <div className="bg-[#18181B] h-full flex flex-col p-4 gap-3 justify-around rounded-md items-center text-center">
        <h1 className="font-bold text-xl">
          ¿Estás seguro de que quieres eliminar este producto?
        </h1>
        <div>
          <p className="text-sm">Esta acción es irreversible.</p>
          <p className="text-sm">¿Deseas continuar?</p>
        </div>
        <div className="flex w-full items-center justify-center gap-4">
          <button
            className="bg-[#b74242] px-3 py-2 rounded-md font-semibold flex gap-2 w-fit"
            onClick={() => deleteFn(id)}
          >
            Eliminar
          </button>
          <button
            className="bg-[#5d75f7] px-3 py-2 rounded-md font-semibold flex gap-2 w-fit"
            onClick={() => close(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWarning;
