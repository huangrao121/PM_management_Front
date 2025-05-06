import {z} from "zod"
const workspaceSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  image: z.union([
    z.instanceof(File),
    z.string().transform((value) => value===""? undefined : value)
  ]).optional(),
})

const updateWrokspaceSchema = z.object({
  name: z.string().trim().min(1, "must be at least 1 character").optional(),
  image: z.union([
    z.instanceof(File),
    z.string().transform((value) => value===""? undefined : value)
  ]).optional(),
})
export {workspaceSchema, updateWrokspaceSchema}