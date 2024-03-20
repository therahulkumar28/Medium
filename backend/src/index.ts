import { Hono } from 'hono'
import blogRoutes from './routes/blog'
import userRoutes from './routes/user'
import { cors } from 'hono/cors'

const app = new  Hono<{
  Bindings :{
    DATABASE : String ,
    JWT_SECRET : String 
  }
} >() ;
app.use('/*', cors())

app.route('/api/v1/user',userRoutes);
app.route('/api/v1/blog',blogRoutes);

export default app
