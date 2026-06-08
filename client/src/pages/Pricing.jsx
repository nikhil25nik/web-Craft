 import axios from "axios";
import { Coins } from "lucide-react";
import React from "react";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const plans = [
  {
    key:"free",
    name: "Starter",
    price: "Free",
    credits:100,
    description: "Perfect for trying out the platform.",
    features: [
      "2 Website Generations",
      "Basic Templates",
      "Community Support",
      "1 Project",
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    key:"pro",
    name: "Pro",
    price: "₹499",
    credits:500,
    description: "Best for freelancers and creators.",
    features: [
      "Unlimited Generations",
      "Premium Templates",
      "Priority Support",
      "10 Projects",
      "Custom Domains",
    ],
    buttonText: "Upgrade to Pro",
    popular: true,
  },
  {
    key:"enterprise",
    name: "Business",
    price: "₹1499",
    credits:1000,
    description: "For teams and growing businesses.",
    features: [
      "Everything in Pro",
      "Unlimited Projects",
      "Team Collaboration",
      "Advanced Analytics",
      "Dedicated Support",
    ],
    buttonText: "Upgrade to Business",
    popular: false,
  },
];

const Pricing = () => {

  const navigate = useNavigate()
  const {userData} = useSelector(state=>state.user);
  const [loading,setLoading] = useState(null)

    const handelPayment = async(planKey)=>{

      if(!userData){
        navigate("/")
        return
      }

      if(planKey === "free"){
        navigate("/dashboard")
        return
      }
      setLoading(planKey)
        try{
            const result = await axios.post(`${serverUrl}/api/payment`,{planType:planKey},{withCredentials:true})
            setLoading(false)
          
            window.location.href=result.data.sessionUrl
           
                }catch(error){
                  setLoading(null)
                    console.log(error)
        }
    }
  return (
    <section className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Create Websites Without Limits

          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Generate professional, responsive websites from simple prompts and publish them in minutes.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? "border-purple-500 bg-white/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-purple-500">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-bold">{plan.name}</h3>

              <div className="mt-4">
                <span className="text-5xl font-bold">{plan.price}</span>
                {plan.price !== "Free" && (
                  <span className="text-zinc-400">/month</span>
                )}
              </div>

              <h3 className="mt-4 text-white flex gap-2 items-center font-semibold"><Coins size={14} color="yellow"/>{plan.credits} Credits</h3>
              <p className="mt-4 text-zinc-400">{plan.description}</p>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-green-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full mt-8 py-3 rounded-xl font-semibold transition ${
                  plan.popular
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90"
                    : "bg-white text-black hover:bg-zinc-200"
                }`} onClick={()=>handelPayment(plan.key)}
              >
                {loading===plan.key ? "Redirecting" : plan.buttonText}
               
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">
            WebCraft AI
          </h2>
          <hr className="text-white/10"/>
          <p className="text-zinc-400 mb-6 mt-4">
             &copy; {new Date().getFullYear()} <a href="">WebCraft</a> All Rights Reserved.
          </p>
          {/* <button className="px-8 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200">
            Contact Us
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default Pricing;