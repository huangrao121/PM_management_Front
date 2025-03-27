import {z} from "zod"

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Must be 6 or more digits" })
})

const signupSchema = z.object({
  username:z.string().min(1, {message: "user name must be larger than 1"}),
  email:z.string().email({ message: "Invalid email address" }),
  password:z.string().min(6, { message: "Must be 6 or more digits" }),
  confirmPassword:z.string().min(6, { message: "Must be 6 or more digits" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"], // The path where the error message should be shown
});

export {schema, signupSchema}