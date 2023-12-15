"use client"

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.postMessage("hello")
    window.close();
  })
  return (<></>);
}