import { type InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "./input";
import { Label } from "./label";

type FormInputProps = {
  label: string;
  name: string;
  placeholderAsLabel?: boolean;
  hideLabel?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({ label, name, placeholderAsLabel = false, hideLabel = false, ...props }: FormInputProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {!hideLabel && <Label htmlFor={`input-${name}`}>{label}</Label>}
      <Input
        {...props}
        {...register(name, { valueAsNumber: props.type === "number" })}
        placeholder={placeholderAsLabel ? label : props.placeholder}
        className="bg-white"
        id={`input-${name}`}
      />
      <span className="text-sm text-red-500">{errors[name]?.message?.toString()}</span>
    </div>
  );
};
