import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import {createBlogInput , updateBlogInput} from '../../../common/src/index'

const blogRoutes = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET : string 
	},Variables : {
		userId: string
	}
}>();

//BLOGROUTES MIDDLEWARE

blogRoutes.use('/*', async (c, next) =>{
  const jwt = c.req.header('Authorization');
  if(!jwt){
    c.status(401);
    return c.json({error:"unothorized"});
  }
  const token = jwt.split(' ')[1];
  const payload = await verify(token , c.env.JWT_SECRET)
  if(!payload){
    c.status(401);
    return c.json({
      error: "unothorized person"
    })

  }
  
  c.set('userId',payload.id);
  await next() ;
})



blogRoutes.post('/', async (c) => {
  const body = await c.req.json() ;
  const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const userId  =  c.get('userId');
  console.log(userId)
   
    console.log(body)
    const {success} = createBlogInput.safeParse(body);

    if(!success){
      c.status(403)
      return c.json({
        msg:"Invalid inputs"
      })
    }

    try{
      const post = await prisma.post.create({
      
      data :{
        title : body.title,
        content :  body.content ,
        authorId : userId 
      }
    })
    c.status(200)
      return c.json({
        id :  post.id
      })
    }catch(error){
      console.log(error)
      c.status(404)
      return c.json("Error during post request ")
    }

  })

blogRoutes.put('/', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl:c.env?.DATABASE_URL ,
    }).$extends(withAccelerate());
    const userId = c.get('userId')
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        msg :"Invalid input types"
      })
    }
    try
    {    const updatedata = prisma.post.update({
          where :{
            authorId: userId ,
            id : body.id
          
          },
          data :{
            title :body.title ,
            content : body.content 
          }
        })
        c.status(200)
        return c.json({
          msg : "updated put request succesfully"
        })
      }catch(error){
        console.log(error)
        c.status(400)
        return c.json({
          message :" error during updation put request"
        })
      }
  })

  blogRoutes.get('/bulk', async (c) => {
   
    try{
      const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL ,
      }).$extends(withAccelerate())
      
      const bulkData = await prisma.post.findMany({
        select:{
          content:true ,
          title : true ,
          id : true ,
          published:true,
          author:{
            select:{
              name:true
            }
          }
        }
      })
      c.status(200)
      return c.json({
       bulkData
      })
    }
    catch(e){
      console.log(e)
    }

  })

blogRoutes.get('/:id',async (c) => {

  const id = c.req.param('id')
  const prisma = new PrismaClient({
    datasourceUrl : c.env?.DATABASE_URL ,
  }).$extends(withAccelerate());

    try{
        const data = await prisma.post.findFirst({
          where :{
            id
          },
          select :{
            id:true ,
            title:true ,
            content : true ,
            author :{
              select:{
                name: true
              }
              
            }
          }
          })
          c.status(200)
          return c.json(
            data )

    }catch(error){
        console.log(error)
        c.status(403);
        return c.json({
          msg : "Failed while getting data during get by id"
        })
    }
  })

  


export default blogRoutes ;