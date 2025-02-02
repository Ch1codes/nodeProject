import { z } from "zod";
const GenderEnum= z.enum(["Male", "Female", "Others"]);
const createUserSchema = z.object({
    fullName:z.string(),
    email:z.string(),
    password:z.string(),
    gender:GenderEnum,
})