import { type InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "./input";
import { Label } from "./label";

type FormInputProps = {
  label: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({ label, name, ...props }: FormInputProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input {...props} {...register(name)} className="bg-white" />
      <span className="text-sm text-red-500">{errors[name]?.message?.toString()}</span>
    </div>
  );
};
