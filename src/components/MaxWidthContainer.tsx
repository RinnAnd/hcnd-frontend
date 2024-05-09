import { FC } from "react";

interface MaxWidthContainerProps {
  children?: React.ReactNode;
}

const MaxWidthContainer: FC<MaxWidthContainerProps> = ({ children }) => {
  return <div className="lg:w-4/5 md:w-5/6 sm:w-full px-7 flex justify-center">{children}</div>;
};

export default MaxWidthContainer;
