import { ArrowLeft, Check, Link, Rocket } from "lucide-react";
import React, { useEffect, useState } from "react";
import {motion} from "motion/react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";


const Dashboard = () => {

  const {userData} = useSelector((state)=>state.user)
  const navigate= useNavigate();
  const [website,setWebsite] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const [copiedId,setCopiedId] = useState(null);


  useEffect(()=>{
    setLoading(true)
    const handelGetAllWebsite = async()=>{
      try{
      const result = await axios.get(`${serverUrl}/api/website/getAll`,{withCredentials:true})
      setWebsite(result.data);
      setLoading(false)
    }catch(error){
      setLoading(false)
      setError(error.response.data.message)
      console.log(error)
    }

    }
    handelGetAllWebsite()
  },[])

  const handelDeploy = async(id)=>{
    try{
      const result = await axios.get(`${serverUrl}/api/website/deploy/${id}`,{withCredentials:true})
      window.open(`${result.data.url}`,"_blank")
      setWebsite((prev)=>{
       prev.map((w)=>w._id === id
        ? {...w,deployed:true,deployedUrl:data.url}
        :w
      ) 
        
      })
    }catch(error){
      console.log(error)
    }
  }

  const handelCopy = async(w)=>{
    await navigator.clipboard.writeText(w.deployedUrl)
    setCopiedId(w._id)
    setTimeout(()=>setCopiedId(null),2000)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-1 rounded-lg hover:bg-white/10 transition" onClick={()=>navigate("/")}><ArrowLeft size={18}/></button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <button className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition" onClick={()=>navigate("/generate")}> + Generate new</button>
        </div>
        
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
      <motion.div
      initial={{opacity:0,y:12}}
      animate={{opacity:1,y:0}}
      className="mb-10"
      >
        <p className="text-sm text-zinc-400 mb-1">Welcome back</p>

        <h1 className="text-3xl font-semibold">{userData?.name}</h1>
      </motion.div>

      {loading && (<div className="text-center text-sm text-zinc-400">
        Loading your websites....
      </div>)}

      {error && !loading &&( 
        <div className="text-center text-sm text-red-400">{error}</div>
      )}

      {website.length === 0 && (
        <div className="text-center text-sm text-zinc-400">
        You have no websites....
      </div>
      )}

      {!loading && !error && website.length>0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {website.map((w,i)=>{
            const copied = copiedId === w._id
            return <motion.div
            key={i}
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{delay:i*0.05}}
            whileHover={{y:-6}}
            
            className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition flex flex-col"
            
            >
          
              <div className="relative h-40 bg-black cursor-pointer" onClick={()=>navigate(`/editor/${w._id}`)}>
                <iframe srcDoc={w.latestCode} className="absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white" sandbox='allow-scripts allow-same-origin allow-forms'/>
                <div className="absolute inset-0 bg-black/30"/>
              </div>
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <h3 className="text-base font-semibold line-clamp-2 truncate">{w.title}</h3>
                  <p className="text-zinc-400 text-xs">Last Updated {""}
                    {new Date(w.updatedAt).toLocaleDateString()}
                  </p>

                  {!w.deployed ? (
                    <button className="mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-linear-to-r from-indigo-500 to-purple-500 hover:scale-105 transition" onClick={()=>handelDeploy(w._id)}><Rocket size={18} /> Deploy</button>
                  ):(
                    <motion.button
                    whileTap={{scal:0.95}}
                    onClick={()=>handelCopy(w)}
                    className={`mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold hover:scale-105 transition-all
                      ${copied
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        :"bg-white/10 hover:bg-white/20 border border-white/20"
                      }
                    `}
                    >
                      {copied ? <><Check size={14}/> Copied</> : <><Link size={14}/> Share Link</>}
                    </motion.button>
                  )}
                </div>
            </motion.div>
})}
        </div>
      )}
      </div>
    </div>
  );
};

export default Dashboard;
