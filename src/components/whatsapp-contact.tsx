"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
const whatsappUrl = "https://wa.me/447862617335?text=Hi%20Raphael%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20project.%20Are%20you%20available%20to%20chat%3F";
const message = "Hi Raphael, I came across your portfolio and would like to discuss a potential project. Are you available to chat?";
export function WhatsAppContact() {
 const [hasScrolled,setHasScrolled]=useState(false);
 const [dismissed,setDismissed]=useState(false);
 const reducedMotion=useReducedMotion();
 useEffect(()=>{
  const onScroll=()=>setHasScrolled(window.scrollY>260);
  onScroll();
  window.addEventListener("scroll",onScroll,{passive:true});
  return ()=>window.removeEventListener("scroll",onScroll);
 },[]);
 return <div className="whatsapp-contact">
  <AnimatePresence>
   {hasScrolled&&!dismissed&&<motion.aside className="whatsapp-preview" aria-label="WhatsApp message preview"
    initial={reducedMotion?false:{opacity:0,y:12,scale:.97}} animate={{opacity:1,y:0,scale:1}}
    exit={reducedMotion?undefined:{opacity:0,y:8,scale:.98}} transition={{duration:reducedMotion?0:.28,ease:"easeOut"}}>
    <div className="whatsapp-preview-top"><span>LET&apos;S TALK ON WHATSAPP</span><button type="button" onClick={()=>setDismissed(true)} aria-label="Close WhatsApp preview"><X size={15}/></button></div>
    <p>{message}</p><a href={whatsappUrl} target="_blank" rel="noreferrer">Open WhatsApp <span aria-hidden="true">↗</span></a>
   </motion.aside>}
  </AnimatePresence>
  <motion.a className="whatsapp-fab" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with Raphael on WhatsApp"
   animate={reducedMotion?undefined:{y:[0,-3,0],scale:[1,1.015,1]}}
   transition={reducedMotion?undefined:{duration:4.5,ease:"easeInOut",repeat:Infinity}}
   whileHover={reducedMotion?undefined:{scale:1.06,y:-2}} whileTap={reducedMotion?undefined:{scale:.97}}>
   <span className="whatsapp-glow" aria-hidden="true"/><Image src="/whatsapp-logo.png" alt="" width={38} height={38}/>
  </motion.a>
 </div>;
}