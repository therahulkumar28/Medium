import { Link } from "react-router-dom";
const Appbar = () =>{
    return(
        <div className="flex justify-between px-8 py-3 items-center shadow-md mb-2">
            <Link to={'/blogs'} >
           <div className="font-bold text-xl">
                Medium 
           </div>
            </Link>
            <div className="flex justify-between gap-8 ">

            <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Publish</button>
            <div className="flex items-center justify-center border rounded-full bg-gray-200 w-10 h-10 text-2xl">
               R
            </div>
            </div>
        </div>
    )
}

export default Appbar ;