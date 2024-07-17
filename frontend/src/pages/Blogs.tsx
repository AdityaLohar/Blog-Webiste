/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import BlogCard from "../component/BlogCard"
import BlogSkeleton from "../component/BlogSkeleton";
import { useBlogs } from "../hooks"
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

    blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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
                        publishedDate={val.createdAt}
                    />)}

                </div>
            </div>
        </div>
    )
}

export default Blogs