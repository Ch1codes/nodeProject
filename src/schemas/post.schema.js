import { z } from "zod";
const likesEnum=z.enum(["like", "unlike"])
export const createPostSchema = z.object({
    content:z.string().max(100, "too long"),
})
.strict();
export const updatePostSchema = z.object({
    content:z.string().max(100, "too long").nullable().nullish(),
    likecase:likesEnum
})
.strict();


 