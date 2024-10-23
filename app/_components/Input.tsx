"use client"

import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: boolean;
  validation?: {};
  type: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  id,
  error,
  validation,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputType, setInputType] = useState(type)
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={inputType}
        className={`block px-4 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-md border-1  appearance-none focus:ring-0.5 peer 
          ${
            error
              ? "text-destructive border-destructive focus:border-destructive focus:ring-destructive"
              : "focus:border-primary text-gray-900 border-zinc-400"
          }`}
        placeholder=" "
        {...props}
        {...validation}
      />
      <label
        htmlFor={id}
        className={`absolute text-sm cursor-text duration-300 transform -translate-y-4 scale-90 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1
          ${
            error
              ? "text-destructive peer-focus:text-destructive"
              : "text-gray-500 peer-focus:text-primary"
          }`}
      >
        {label}
      </label>
      {type === "password" && (
        <div className="absolute h-full flex items-center top-[1px] z-10 right-4 peer">
          {showPassword ? (
            <EyeIcon
              onClick={() => {
                setInputType("password")
                setShowPassword(false);
              }}
              className={`h-[30px] bg-white cursor-pointer  ${error ? "text-destructive" : "text-zinc-500" }`}
            />
          ) : (
            <EyeOffIcon
              onClick={() => {
                setInputType("text")
                setShowPassword(true);
              }}
              className={`h-[30px] bg-white cursor-pointer  ${error ? "text-destructive" : "text-zinc-500" }`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
