import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupBodyInput, singinBodyInput} from '../../../common/src/index'

//Binding environment variables
const userRoutes = new Hono<{
	Bindings: {
		DATABASE_URL: string
        JWT_SECRET : string 
	}
}>();



//Defining signup Routes 
userRoutes.post('/signup', async (c) => {
  	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const {success} = signupBodyInput.safeParse(body)
    if(!success){
         c.status(411)
        return c.json({
            message : "Incorrect inputs"
        })
      
    }
	try {
        const existUser = await prisma.user.findUnique(
            {
                where: {
                    email: body.email,
             
                },
            }
        )
        if(existUser){
            c.status(403)
            return c.json({
                msg:"User already Signup"
            })
        }
		const user = await prisma.user.create({
			data: {
				email: body.email,
                name: body.name ,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})


//signin routes
userRoutes.post('/signin',async (c) => {
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    
    const {success} = singinBodyInput.safeParse(body);
    if(!success ){
        c.status(411);
        return c.json({msg:"Invalid user name or password"})
    }
    try{
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
          password : body.password ,
            },
        });
    
        if (!user) {
            c.status(403);
            return c.json({ error: "user not found" });
        }
    
    console.log(c.env.JWT_SECRET)
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });

    }catch(error){
        console.log(error)
        return c.json({
            error:"error during sign in "
        })
    }
	
})

export default userRoutes ;