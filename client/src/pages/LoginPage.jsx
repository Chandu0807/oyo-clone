import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[redirect,setRedirect]= useState(false);
   const{setUser} =useContext(UserContext);

    async function handleLogin(ev){
        ev.preventDefault();
        try {
            const {data} =await axios.post('/login',{email,password}) ;
            setUser(data);
            alert(' Login succesfull');

            setRedirect(true);

        } catch (e) {
            alert('Login failed')
        }
 
  
    }

    if (redirect){
        return <Navigate to ={'/'}/>
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="-mt-40">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto " onSubmit={handleLogin}>
                <input type = 'email' 
                placeholder="your@email.com" 
                value={email} 
                onChange={ev => setEmail(ev.target.value)}/>
                <input type="password"
                 placeholder ="password"
                 value={password}
                  onChange={ev => setPassword(ev.target.value)}/>
<center><button className="chan p-2">Login</button></center>
               <div className="text-center py-2">
                Don't have account? 
                <Link to={'/register'}><b>Register Now</b></Link>
               </div>
              
            </form>
            </div>
            </div>
           
    );
}