import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"
import { BACKEND_URL } from "../config";

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: Date,
    id: number
}

const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    const computePublishedDate = (dateString: Date) => {
        const createdAt = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - createdAt.getTime();
        const diffInHours = diffInMs / (1000 * 60 * 60);
        const timeOptions : Intl.DateTimeFormatOptions = {
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleDelete = async () => {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });

        // Check if deletion was successful
        if (response.status === 200) {
            alert('Blog deleted successfully');
        } else {
            alert('Failed to delete blog');
        }
    };

    return (
        <div>

            <div className="border-b-2 border-gray-100 max-w-3xl p-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-3 pb-3">
                        <Avatar name={authorName} />
                        <p>
                            {authorName}
                        </p>
                        <p className="text-gray-400">
                            {computePublishedDate(publishedDate)}
                        </p>
                    </div>
                    <div className="relative">
                        <button onClick={() => isModalOpen === true ? setIsModalOpen(false) : setIsModalOpen(true)}>
                            ...
                        </button>
                        {isModalOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-gray-200 rounded-md shadow-lg z-10">
                                {/* <div className="py-2 px-4 cursor-pointer hover:bg-gray-100">
                                Change Profile Picture
                            </div> */}
                                <div
                                    className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                <Link to={`/blog/${id}`}>
                    <div className="font-bold text-2xl py-1">
                        {title}
                    </div>

                    <div className="text-gray-600 py-1">
                        {content.length > 120 ? `${content.slice(0, 120)}...` : content}
                    </div>

                </Link>
                <div className="text-sm text-gray-400 py-1">
                    {Math.ceil(content.length / 100)} {Math.ceil(content.length / 100) > 1 ? "mins" : "min"} read
                </div>
            </div>
        </div>
    )
}

const sizeClasses : { [key: number]: string } = {
    6: "w-6 h-6",
    8: "w-8 h-8",
    10: "w-10 h-10",
    12: "w-12 h-12",
};

export function Avatar({ name, size = 6 }: { name: string, size?: number }) {
    const sizeClass = sizeClasses[size] || sizeClasses[6];

    return <div className={`relative inline-flex items-center justify-center ${sizeClass} overflow-hidden bg-gray-300 rounded-full`}>
        <span className="font-medium text-gray-100 dark:text-gray-500">
            {name[0] ? name[0].toLowerCase() : "Anonymous"}
        </span>
    </div>
}

export default BlogCard