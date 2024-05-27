import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import Fullblog from "../components/FullBlog";
import Appbar from "../components/Appbar";

function Blog (){
  const {id} = useParams() ;
  console.log(id)
  const {loading , blog } = useBlog({id:id || ""});
  if(loading){
    return (<div>
      loading ....
    </div>)

  }
  
  
    {console.log(blog)}
  return (<div>
    <Appbar />
      <Fullblog blog={blog} />
  </div>)
}



export default Blog;
