import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SERVER: string
  }
}>();

app.use("/*", cors())

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

// Middleware
app.use('/api/v1/blog/*', async (c, next) => {
  const header = await c.req.header("authorization") || "";

  const response = await verify(header, c.env.JWT_SERVER)
  if (response.id) {
    await next()
  }
  else {
    c.status(403);
    return c.json({ error: "unauthorized" })
  }
})

export default app
