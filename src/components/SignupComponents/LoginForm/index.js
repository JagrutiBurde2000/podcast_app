import React, { useState } from "react";
import Button from "../../common/Button";
import InputComponent from "../../common/input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";
const LoginForm = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loading, setLoading]=useState(false)
  const navigate=useNavigate();
  const dispatch=useDispatch();



  const handleLogin = async () => {
      setLoading(true);

      if(email && password){
        try {
          //creating user's account
          
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
  
          const user = userCredential.user;
          const userDoc=await getDoc(doc(db, "users", user.uid));
          const userData=userDoc.data();
          console.log("user", userData);
            //saving user's details
     

          //save data in the redux, call the redux action 
          dispatch(setUser(
            {
                name: userData.name,
                email: user.email,
                uid: user.uid,
           
              }
          ));
          toast.success("Login Successfully!")
        setLoading(false)
          navigate("/profile")
      } catch (error) {
        console.log("error", error);
        setLoading(false);
        toast.error(error.message)
      }
   
      }else{
        toast.error("Make sure email and password not empty!")
        setLoading(false);
      }
       
  }

        
       
     

      

 

  return (
    <>
    
      <InputComponent
        type="email"
        state={email}
        setState={setEmail}
        placeholder="Email"
        required={true}
      />
      <InputComponent
        type="password"
        state={password}
        setState={setPassword}
        placeholder="Password"
        required={true}
      />
    
     
    <Button text={loading? "Loading..." : "Login"} disabled={loading}  onClick={handleLogin}/>
    </>
  );
};

export default LoginForm;