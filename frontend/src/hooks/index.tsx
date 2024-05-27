import axios from 'axios';
import { useState, useEffect } from 'react';

export interface Blog {
    "content":string,
    "title":string,
    "id":string ,
    "author":{
        "name":string
    }
}
export const useBlog = ({id}:{id:string}) => {
  
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    
    useEffect(() => {
        const jwt = localStorage.getItem('token')
       
        axios.get(`http://127.0.0.1:8787/api/v1/blog/${id}`,{
            headers:{
                
                Authorization:`Bearer ${jwt}`
            }
        })
            .then(response => {
                setBlog(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error during bulk fetching:", error);
            });
    }, []);

    return {
        loading,
        blog
    };
};

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog>();

    useEffect(() => {
        const jwt = localStorage.getItem('token')
        axios.get('http://127.0.0.1:8787/api/v1/blog/bulk',{
            headers:{
                
                Authorization:`Bearer ${jwt}`
            }
        })
            .then(response => {
                const token = localStorage.getItem("token")
                console.log(token)
                setBlogs(response.data.bulkData);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error during bulk fetching:", error);
            });
    }, []);

    return {
        loading,
        blogs
    };
};


