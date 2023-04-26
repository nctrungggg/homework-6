import React from "react";
import { useController } from "react-hook-form";

interface Props {
  type: string;
  name: string;
  placeholder: string;
  control: any;
  disabled?: boolean;
}

const Input = ({
  type = "text",
  name = "",
  placeholder = "Input",
  control,
  ...props
}: Props) => {
  const { field } = useController({
    control,
    name,
  });

  return (
    <input
      type={type}
      id={name}
      placeholder={placeholder}
      {...field}
      {...props}
      className="py-4 pl-0  border-b-[1px] text-gray-600 outline-none placeholder:text-[13px] bg-[#f7f7f7] border-slate-300 w-full text-base"
    />
  );
};

export default Input;
