import { FC } from "react";

interface ErrorProps {
  message: string;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorModal: FC<ErrorProps> = ({ message, close }) => {
  return (
    <div className="absolute inset-0">
      <div className="w-full h-full flex justify-center items-center flex-col text-black">
        <div className="w-[20rem] h-44 bg-gray-200 flex flex-col justify-between items-center rounded-md opacity-100 border shadow-slate-500">
          <div className="flex flex-col items-center h-4/6 justify-center">
            <h1 className="text-2xl font-bold text-slate-900 text-center">{message}</h1>
            <p>Por favor inténtalo de nuevo.</p>
          </div>
          <div className="w-full border-t border-t-slate-400 flex justify-center h-2/6 items-center">
            <button className="h-full w-full text-lg font-semibold text-blue-700" onClick={() => close(false)}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
