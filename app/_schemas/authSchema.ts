import * as z from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const lowerCaseRegex = /^(?=.*[a-z])/;
const upperCaseRegex = /^(?=.*[A-Z])/;
const digitRegex = /^(?=.*\d)/;
const specialCharRegex = /^(?=.*[@$!%*?&])/;

export const SignupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    username: z.string().min(5, "Username must be at least 5 charcters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(lowerCaseRegex, "Must include at least on lowercase")
      .regex(upperCaseRegex, "Must include at least one uppercase")
      .regex(digitRegex, "Must include at least one digit")
      .regex(specialCharRegex, "Must include at least one special character"),
    re_password: z.string(),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords do not match",
    path: ["re_password"],
  });

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required to login"),
  password: z.string().min(1, "Password is required to login")
});