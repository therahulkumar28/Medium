import z from 'zod'

//Zod validations 
export const signupBodyInput = z.object({
    email: z.string().email(),
    name : z.string().optional() ,
    password : z.string()
})

export type signupBodyInput = z.infer<typeof signupBodyInput>

//Zod validations for signin 
export const singinBodyInput = z.object({
    email : z.string().email(),
    password : z.string()
})

export type singinBodyInput = z.infer<typeof singinBodyInput>

export const createBlogInput = z.object ({
    title : z.string() ,
    content :z.string(),
   
})

export type createBlogInput = z.infer<typeof createBlogInput >

export const updateBlogInput = z.object({
    title : z.string(),
    content:z.string(),
    id : z.string()
})

export type updateBlogInput = z.infer<typeof updateBlogInput >