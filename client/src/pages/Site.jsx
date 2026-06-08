import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { serverUrl } from '../App'

const Site = () => {

    const {slug} = useParams()
    const [html,setHtml] = useState("");
    const [error,setError] = useState("")
   
    
    useEffect(()=>{
        const handelSiteUpdate = async(slug)=>{
            try{
                const result= await axios.get(`${serverUrl}/api/website/get-by-slug/${slug}`,{withCredentials:true})
              
                setHtml(result.data.latestCode)
            }catch(error){
                console.log(error)
                setError("Site not found!")
            }
        }
        handelSiteUpdate(slug)
    },[slug])

    if(error){
        return(
            <div className='h-screen flex items-center justify-center bg-black text-white'>{error}</div>
        )
    }
  return (
   
        <iframe title='Live site' srcDoc={html} className='w-screen h-screen border-none' sandbox='allow-scripts allow-same-origin allow-forms'></iframe>

  )
}

export default Site