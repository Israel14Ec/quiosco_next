"use client"

import { useRouter } from 'next/navigation'

export default function GoBackButton() {
    const router = useRouter()

    //Router back regresa a la pagina previa
  return (
    <button

        onClick={()=>router.back()}
        className=" bg-amber-400 w-full lg:w-auto text-lg px-5 py-3 font-bold cursor-pointer"
        >
        Volver
    </button>
  )
}
