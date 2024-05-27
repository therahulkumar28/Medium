import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import {useBlogs} from "../hooks";

export default function Blogs() {
    const { loading, blogs }: { loading: boolean, blogs: any } = useBlogs();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center flex-col items-center  min-h-screen w-full">

                <div className="max-w-8xl">
           
                    {blogs.map((blog: any) => (
                        <BlogCard
                            key={blog.id}
                            authorName={blog.author.name}
                            publishDate={"2 march 2024"}
                            content={blog.content}
                            title={blog.title}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}
