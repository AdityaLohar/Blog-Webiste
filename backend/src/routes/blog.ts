import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

// Middleware
blogRouter.use('/*', async (c, next) => {
    const authHeader = await c.req.header("authorization") || "";

    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            //@ts-ignore
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({ error: "You are not logged in" });
        }
    } catch (err) {
        c.status(403);
        return c.json({ err });
    }

})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const authorId = c.get("userId")

    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId),
                createdAt: new Date()
            }
        })

        return c.json({ id: blog.id })

    } catch (err) {
        c.status(403);
        return c.json({ err });
    }

})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body = await c.req.json()

        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        return c.json({ id: blog.id })

    } catch (err) {
        c.status(403);
        return c.json({ err });
    }
})

// Todo: add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.blog.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        })
        return c.json({ blogs })
    } catch (err) {
        c.status(500)
        return c.json({ err: "error in getting bulk" })
    }
})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // const body = await c.req.json()

    try {
        const id = c.req.param('id')
        const blog = await prisma.blog.findFirst({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        })
        return c.json({ blog })

    } catch (e) {
        c.status(411)
        return c.json({ msg: "Error in get blog" })
    }
})

blogRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const id = parseInt(c.req.param('id') || '');
        if (!id) {
            c.status(400);
            return c.json({ error: "Invalid blog ID" });
        }

        const existingBlog = await prisma.blog.findFirst({
            where: {
                id: id
            },
            select: {
                authorId: true
            }
        });

        if (!existingBlog) {
            c.status(404);
            return c.json({ error: "Blog not found" });
        }

        const userId = c.get("userId");
        if (existingBlog.authorId !== Number(userId)) {
            c.status(403);
            return c.json({ error: "You are not authorized to delete this blog" });
        }

        await prisma.blog.delete({
            where: {
                id: id
            }
        });

        c.status(200)
        return c.json({ message: "Blog deleted successfully" });

    } catch (err) {
        c.status(500);
        return c.json({ error: "Failed to delete blog", details: err });
    }
});

