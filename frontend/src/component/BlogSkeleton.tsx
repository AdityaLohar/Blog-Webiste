import React from 'react'

const BlogSkeleton = () => {
    return (
        <div className='flex justify-center animate-pulse'>
            <div className="border-b-2 border-gray-100 w-full p-8 max-w-screen-md">
                <div className="flex items-center gap-3 pb-3">
                    <div className="h-6 bg-gray-200 rounded-full w-6"></div>
                    <div className="h-2 w-20 bg-gray-200 rounded-full"></div>
                    <div className="h-2 w-20 bg-gray-200 rounded-full"></div>
                </div>

                <div className="font-bold text-2xl py-1">
                    <div className="h-2 bg-gray-200 rounded-full md:w-[520px] mb-2.5"></div>
                </div>

                <div className="text-gray-600 py-1">
                    <div className="h-2 bg-gray-200 rounded-full md:w-[520px] mb-2.5"></div>
                </div>

                <div className="text-sm text-gray-400 py-1">
                    <div className="h-2 bg-gray-200 rounded-full md:w-[520px] mb-2.5"></div>
                </div>
            </div>
        </div>

    )
}

export default BlogSkeleton