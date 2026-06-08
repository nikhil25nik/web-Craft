import { AnimatePresence, motion } from "motion/react";
import React from "react";
import {auth,provider} from "../firebase.js"
import axios from "axios"
import { signInWithPopup } from "firebase/auth";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/userSlice.js";


const LoginModels = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const googleAuth = async()=>{
    try{

      const result = await signInWithPopup(auth,provider)
      const {data} = await axios.post(`${serverUrl}/api/auth/google`,{
        name:result.user.displayName,
        email:result.user.email,
        avatar:result.user.photoURL
      },{withCredentials:true})
      dispatch(setUserData(data))
      onClose()
    }catch(err){
      console.log(err)
    }
  }
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex z-100 items-center justify-center backdrop-blur-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onClose()}
        >
          <motion.div
          initial={{scale:0.88,opacity:0, y:60}}
          animate={{scale:1,opacity:1,y:0}}
          exit={{scale:0.9,opacity:0,y:40}}
          transition={{duration:0.45,ease:"easeOut"}}
          className="relative w-full max-w-md p-px rounded-3xl bg-linear-to-br from-purple-500/60 via-blue-500/50 to-transparent" onClick={(e)=>e.stopPropagation()}
          >

            <div className="relative rounded-3xl bg-[#0b0b0b] border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.8)] overflow-hidden">
                <motion.div 
                animate={{opacity:[0.25,0.4,0.25]}}
                transition={{duration:6,repeat:Infinity}}
                className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/30 blur-[140px]"
                />
                <motion.div
                animate={{opacity:[0.2,0.35,0.2]}}
                transition={{opacity:6,repeat:Infinity}}
                className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/30 blur-[140px]"
                />
          <button className="absolute top-5 right-5 z-40 text-zinc-400 hover:text-white transition text-lg" onClick={onClose}>
            X
          </button>
          <div className="relative px-8 pt-14 pb-10 text-center">
            <h1 className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">AI Powered website builder</h1>
            <h2 className="text-3xl font-semibold leading-tight mb-5 space-x-3">
                <span>Welcome to</span>
                <span className="bg-linear-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">WebCraft</span>
            </h2>

            <motion.button
            whileHover={{scale:1.04}}
            whileTap={{scale:0.96}}
            onClick={googleAuth}
            className="group relative w-full h-13 rounded-xl bg-white text-black font-semibold shadow-xl overflow-hidden"
            >
                <div className="relative flex items-center justify-center gap-3">

                <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="" className="h-5 w-5"/> Continue with google
                </div>
            </motion.button>

            <div className="flex items-center gap-4 my-10">
                <div className="h-px flex-1 bg-white/10"/>
                <span className="text-xs text-zinc-400 tracking-wide">Secure Login</span>
                <div className="h-px flex-1 bg-white/10"/>
            </div>
            
            <p className="text-xs text-zinc-400 leading-relaxed">
                By continuing, you agree to our {" "}
                <span className="underline hover:text-zinc-300"><a href="">Terms of service </a></span>{"  "} 
                 and{" "}
                <span className="underline hover:text-zinc-300"> <a href="">Privacy Policy</a></span>.
            </p>

          </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModels;
