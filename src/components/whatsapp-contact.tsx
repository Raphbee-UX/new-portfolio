"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
const whatsappUrl = "https://wa.me/447862617335?text=Hi%20Raphael!%20%F0%9F%91%8B%20I%20came%20across%20your%20portfolio%20and%20I%27m%20interested%20in%20working%20with%20you.%20%F0%9F%9A%80%20Could%20we%20have%20a%20quick%20chat%20about%20my%20project%3F";
const message = "Hi Raphael! 👋 I came across your portfolio and I\u0027m interested in working with you. 🚀 Could we have a quick chat about my project?";
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
   <span className="whatsapp-glow" aria-hidden="true"/><Image src="https://raw.githubusercontent.com/Raphbee-UX/new-portfolio/main/whatsapp-logo.png" alt="" width={52} height={52} style={{ width: 52, height: 52 }}/>
  </motion.a>
 </div>;
}