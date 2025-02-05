import { z } from "zod";
const GenderEnum= z.enum(["MALE", "FEMALE", "OTHERS"]);
export const createPostSchema = z.object({
    content:z.string(),
    likesCount:z.number(),
})
.strict();

// export const loginUserSchema = z.object({
//     email: z.string(),
//     password:z.string(),
// })
// .strict();