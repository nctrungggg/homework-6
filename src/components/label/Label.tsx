import React from "react";

interface Props {
  htmlFor: string;
  children: React.ReactNode;
}

const Label = ({ htmlFor, children, ...props }: Props) => {
  return (
    <label
      className="block mb-2 text-[15px] cursor-pointer"
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
