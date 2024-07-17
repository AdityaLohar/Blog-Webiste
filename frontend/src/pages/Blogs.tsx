/* eslint-disable @typescript-eslint/no-unused-vars */
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
                        publishedDate='14 June 2024'
                    />)}

                </div>
            </div>
        </div>
    )
}

export default Blogs