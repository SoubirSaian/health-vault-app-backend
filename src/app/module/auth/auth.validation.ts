import { z } from "zod";

export const registerUserValidationSchema = z.object({
  body: z.object({

    name: z
      .string()
      .min(1, "Full name is required")
      .max(200, "Full name too long"),

    email: z
      .string()
      .email("Invalid email format"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    contact: z
      .string()
      .min(1, "Contact number is required"),

    role: z.enum(["customer", "provider"], {
      message: "Role is required",
    }),
  })
  // validate that password === confirmPassword
//   .refine(
//     (data) => data.password === data.confirmPassword,
//     {
//       message: "Password and confirm password must match",
//       path: ["confirmPassword"],
//     }
//   ),
});



const loginValidationSchema = z.object({
    body: z.object({
        email: z.string().email('Email must be a valid email'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    }),
});

const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string().min(1, 'Old password must be at least 6 characters'),
        newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    }),
});

const completeProfileValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1, "User ID is required"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
  })
});

const AuthValidations = { 
    registerUserValidationSchema,
    loginValidationSchema,
    changePasswordValidationSchema,
    completeProfileValidationSchema
 };
export default AuthValidations;