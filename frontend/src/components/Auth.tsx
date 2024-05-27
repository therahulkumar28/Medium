import { Link,  useNavigate } from "react-router-dom";
import { useState, ChangeEvent  } from 'react'
import { signupBodyInput } from '../../../common/src/index'
import axios from "axios";

function Auth({ type }: { type: "signup" | "signin" }) {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<signupBodyInput>({
        email: "",
        password: "",
        name: ""
    })

 async function handleSignup(){
   
        try{      
            if (!postInputs.email || !postInputs.password || !postInputs.name) {
                alert('Please fill in all fields');
                return;
            }
          const response = await axios.post('http://localhost:8787/api/v1/user/signup',{
                
                    email:postInputs.email,
                    password:postInputs.password ,
                    name:postInputs.name
         
                
            })
            const jwt = response.data.jwt ;
            console.log(jwt)
            localStorage.setItem("token",jwt)
            
            navigate('/blogs')
        }catch(error){
            alert('Error while signup')
        }
}
async function  handleSignin(){
 
    try{ 
        if (!postInputs.email || !postInputs.password) {
            alert('Please fill in all fields');
            return;
        }     
        const response = await axios.post('http://127.0.0.1:8787/api/v1/user/signin',{
             
                  email:postInputs.email,
                  password:postInputs.password ,
        
              
          })
          const jwt = response.data.jwt ;
          console.log(jwt)
          localStorage.setItem('token', jwt);
          const token = localStorage.getItem("token")
          console.log(token)
          navigate('/blogs')
      }catch(error){
          alert('Error while signin')
      }
}
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="text-3xl font-extrabold">
                Create an account
            </div>
            <div className="text-slate-400 mt-2 text-left">
                {type === 'signin' ? "Don't have an account ?  " : "Already have account ?  "}
                <Link className="pl-2 underline" to={type === 'signin' ? "/signup" : "/signin"} >{type === 'signup' ? "Sign In" : "Sign Up"}</Link>
            </div>
        {type === 'signup' ?  <LablledInput label="Full Name" type="text" placeholder="Rahul Kumar" onChange={(e) => { setPostInputs({ ...postInputs, name: e.target.value }) }} />:null}
            <LablledInput label="Email" type="email" placeholder="rahul@gmail.com" onChange={(e) => { setPostInputs({ ...postInputs, email: e.target.value }) }} />
            <LablledInput label="Password" type="password" placeholder="12345678" onChange={(e) => { setPostInputs({ ...postInputs, password: e.target.value }) }} />

            <button type="submit"  onClick={type === 'signin' ? handleSignin : handleSignup}className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-96 sm:w-96 px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-700">{type === 'signin' ? "Sign In" : "Sign Up"}</button>
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LablledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">{label}</label>
            <input
                onChange={onChange}
                type={type}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2 placeholder-gray-400 dark:placeholder-gray-400"
                placeholder={placeholder}
                required
            />
        </div>
    );
}

export default Auth;
