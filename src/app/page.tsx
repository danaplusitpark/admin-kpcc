"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if(localStorage.getItem("token")){
      router.push("/bearers")
    }else{
      router.push("/login")
    }
  })
  return (
    <>
    
    </>
  );
}
