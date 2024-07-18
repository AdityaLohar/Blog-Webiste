/* eslint-disable @typescript-eslint/ban-ts-comment */
import BlogCard from "../component/BlogCard"
import BlogSkeleton from "../component/BlogSkeleton";
import { useBlogs } from "../hooks"
// @ts-ignore
import Navbar from './../component/Navbar';

const Blogs = () => {
    const { loading, blogs } = useBlogs()

    if (loading) {
        return <div>
            <Navbar />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
        </div>
    }

    blogs.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
    });

    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <div className="">
                    {blogs.map(val => <BlogCard
                        key={val.id}
                        id={val.id}
                        authorName={val.author.name || "Anonymous"}
                        title={val.title}
                        content={val.content}
                        publishedDate={val.createdAt ?? new Date()}
                    />)}

                </div>
            </div>
        </div>
    )
}

export default Blogs