interface BlogCardProps {
    authorName : string ,
    title : string ,
    content: string,
    publishDate:string,
   
}

const BlogCard = ({
    authorName ,
    title ,
    content ,
    publishDate,
    
}:BlogCardProps) => {
    return (
        <div className="bg-white p-6 rounded-md shadow-md my-4 w-screen max-w-xl">
            <div className="text-gray-500 text-sm font-bold mb-2 flex items-center">
                <div className="flex justify-center items-center border rounded-full w-6 h-6 bg-gray-200 mr-2">
                    {authorName[0].toUpperCase()}
                </div>
                {authorName} &middot;{" "}
                <span className="text-gray-400 font-normal m-1">{publishDate}</span>
            </div>
            <div className="text-xl font-semibold mb-2">{title}</div>
            <div className="text-gray-700">{content.slice(0, 100) + "..."}</div>
            <div className="text-gray-400 mt-4 ">{`${Math.ceil(content.length / 100)} min(s) read`}</div>
        </div>
    )
}

export default BlogCard