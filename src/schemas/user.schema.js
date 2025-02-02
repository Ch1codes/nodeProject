import { z } from "zod";
const GenderEnum= z.enum(["MALE", "FEMALE", "OTHERS"]);
export const createUserSchema = z.object({
    fullName:z.string(),
    email:z.string(),
    password:z.string(),
    gender:GenderEnum,
})
.strict();