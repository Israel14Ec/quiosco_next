"use client"

import { Product } from "@prisma/client"
import { useStore } from "@/src/store"

type AddProductButtonprops = {
    product: Product
}

export default function AddProductButton({product} : AddProductButtonprops) {
  
    const addToOrder = useStore(state => state.addToOrder)

    return (
    <button 
        className=" bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-4 px-3 py-2 rounded-lg uppercase font-bold cursor-pointer"
        onClick={() => addToOrder(product)}    
    >
        Agregar
    </button>
  )
}
