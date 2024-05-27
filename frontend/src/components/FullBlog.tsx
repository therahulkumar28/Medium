import { Blog } from '../hooks/index'
const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div className="flex justify-around m-2 p-4 ">
            <div className='max-w-screen-md'>

                <div className="text-4xl mb-2  font-bold text-gray-800">{blog.title}</div>
                <div className='text-gray-500 mb-2 text-sm'>
                    Posted on August 24, 2023
                </div>
                <p className=" text-smtext-gray-600">{blog.content}Lorem Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident quo pariatur id, delectus magnam odio animi nam libero repellendus aspernatur esse? Quae fugiat reprehenderit nisi corrupti dolorum omnis deserunt alias.</p>
               
            </div>
            <div className=''>
                <div className='m-4 text-gray-900'>Author</div>
                <div className='flex justify-between items-between '>
                    <div className='w-6 h-6 bg-gray-200 rounded-full flex justify-center items-center m-4'>
                        {blog.author.name[0].toUpperCase()}
                    </div>
                    <div className='flex flex-col '>

                        <div className='font-bold '>

                            {blog.author.name.toUpperCase()}
                        </div>
                        <div className='text-gray-500'>
                            Lorem, ipsum lfsjdglsjldfjl alsdkjf sdlkfjalsd sldfjlasd
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default FullBlog;
