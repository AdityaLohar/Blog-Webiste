import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { Avatar } from "../component/BlogCard"
import Navbar from './../component/Navbar';
import BlogSkeleton from "../component/BlogSkeleton";
import { useContext, useEffect } from "react";

const Blog = () => {
  const { id } = useParams()

  const { loading, blog } = useBlog({
    id: id || ""
  })

  if (loading) {
    return <div>
      <Navbar />
      <BlogSkeleton />
    </div>
  }

  const computePublishedDate = (dateString: Date) => {
    const createdAt = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - createdAt.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // For AM/PM format
    };

    if (diffInHours < 24) {
      return `Today at ${createdAt.toLocaleTimeString([], timeOptions)}`;
    } else if (diffInHours < 48) {
      return `Yesterday at ${createdAt.toLocaleTimeString([], timeOptions)}`;
    } else {
      return createdAt.toLocaleDateString();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className=' grid grid-cols-12 gap-4 p-4 sm:p-10'>
          <div className="hidden lg:block lg:col-span-2"></div>
          <div className="col-span-12 md:col-span-8 lg:col-span-6 px-5">
            <div className="py-2 font-extrabold text-3xl sm:text-4xl">
              {blog?.title}
            </div>
            <div className="py-2 text-gray-400">
              {computePublishedDate(blog?.createdAt)}
            </div>
            <div className="block md:hidden py-2">
              <div>Author</div>
              <div className="flex font-bold py-2 items-center">
                <div className="pr-2">
                  <Avatar name={blog?.author.name || "Anonymous"} size={10} />
                </div>
                {blog?.author.name}
              </div>
            </div>
            <div className="py-2">
              {blog?.content}
            </div>
          </div>
          <div className="hidden md:block md:col-span-2 px-5">
            <div>Author</div>
            <div className="flex font-bold py-2 items-center">
              <div className="pr-2">
                <Avatar name={blog?.author.name || "Anonymous"} size={10} />
              </div>
              {blog?.author.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog