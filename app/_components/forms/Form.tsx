import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Button } from "@/components/ui/button";
import Input from "../Input";

interface FormField {
  name: string;
  type: string;
  label: string;
}

interface FormProps {
  title: string;
  fields: FormField[];
  onSubmit: (data: any) => void;
  schema: z.ZodSchema<any>;
  isLoading: boolean;
}

const Form = (props: FormProps) => {
  const { fields, schema, onSubmit, title, isLoading } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
      {fields.map((field, index) => (
        <div key={index} className="mb-4 flex flex-col gap-1">
          <Input
            id={field.name}
            label={field.label}
            type={field.type}
            validation = {register(field.name, { required: true })}
            error={(errors[field.name]?.message as string) != null}
          />
          {errors[field.name] && <p className="text-[13px] text-destructive pl-2">{errors[field.name]?.message as string}</p>}
        </div>
      ))}
      <Button disabled={isLoading}  className="text-[16px] py-5">
        {isLoading ? "Loading..." : title}
      </Button>
    </form>
  );
};

export default Form;
