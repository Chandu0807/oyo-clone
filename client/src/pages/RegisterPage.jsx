import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

export default function RegisterPage(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [ password,setPassword]=  useState('');
 async   function registeruser(ev) {
        ev.preventDefault();
        try {
            await   axios.post('/register',{
                name,
                email,
                password,
            });
    
            alert('Account created!')  
        } catch (e) {
            alert('registration failed!')
        }
     
    }
    
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="-mt-40">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={registeruser} >

                <input type="text" placeholder ="chandu"
                value={name} 
                onChange={ev => setName(ev.target.value)}
                />

                <input type = 'email' placeholder={"your@email.com"}
                value={email}
                onChange={ev => setEmail(ev.target.value)}
                />

                <input type="password" placeholder ="password" 
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                 />

<center><button className="chan p-2">Register</button></center>
               <div className="text-center py-2">
                Already have an account?
                <Link to={'/login'}><b>Login</b></Link>
               </div>
              
            </form>
            </div>
            </div>
           
    );
}