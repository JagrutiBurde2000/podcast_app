

import React, { useState } from "react";
import Button from "../../common/Button";
import InputComponent from "../../common/input";
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";


const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[loading, setLoading]=useState(false);
 const navigate=useNavigate();
  const dispatch=useDispatch();


  const handleSignup = async () => {
    console.log("Handle Signup...");
  setLoading(true);
    if (password == confirmPassword && password.length >= 6 && fullName && email) {
      try {
        //creating user's account
        
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;
        console.log("user", user);

      //saving user's details
        await setDoc(doc(db, "users", user.uid), {
            name: fullName,
            email: user.email,
            uid: user.uid,
            // profileImage: profileImageUrl,
          });


          //save data in the redux, call the redux action 
          dispatch(setUser(
            {
                name: fullName,
                email: user.email,
                uid: user.uid,
                // profileImage: profileImageUrl,
              }
          ));
          toast.success("User has been created Successfully!")
         setLoading(false)
          navigate("/profile")
      } catch (error) {
        console.log("error", error);
      toast.error(error.message)
      }
    } else {
     if(password!=confirmPassword){
      toast.error("Passwords dosen't matches!")
     }else if(password.length<6){
      toast.error("Make sure password length more than 6!")
     }
     setLoading(false)
    }
  };

 

  return (
    <>
      <InputComponent
        type="text"
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        required={true}
      />
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
      <InputComponent
        type="password"
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        required={true}
      />
   
   <Button text={loading? "Loading..." : "Signup"} disabled={loading} onClick={handleSignup} />
    </>
  );
};

export default SignupForm;