import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

interface Blog {
    content: string,
    title: string,
    id: number,
    author: {
        name: string
    },
    createdAt?: Date
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>()

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(res => {
                setBlog(res.data.blog)
                setLoading(false)
            })
    }, [id])

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: token
                }
            });

            setBlogs(response.data.blogs);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setLoading(false); // Handle error state if needed
        }
    };

    useEffect(() => {
        fetchBlogs(); // Call fetchBlogs when component mounts

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array ensures fetchBlogs is called only once

    return {
        loading,
        blogs,
        fetchBlogs // Return fetchBlogs function for manual triggering
    };
};

// export const useBlogs = () => {
//     const [loading, setLoading] = useState(true)
//     const [blogs, setBlogs] = useState<Blog[]>([])

//     useEffect(() => {
//         axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
//             headers: {
//                 Authorization: localStorage.getItem('token')
//             }
//         })
//             .then(res => {
//                 setBlogs(res.data.blogs)
//                 setLoading(false)
//             })
//     }, [blogs])

//     return {
//         loading,
//         blogs
//     }
// }


