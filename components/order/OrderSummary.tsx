"use client"

import { useMemo } from 'react'
import { useStore } from "@/src/store"
import ProductDetails from "../products/ProductDetails"
import { formatCurrency } from '@/src/utils'
import { createOrder } from '@/actions/create-order-action'
import { OrderSchema } from '@/src/schema'
import { toast } from 'react-toastify'

export default function OrderSummary() {
  
  const order = useStore((state) => state.order)
  const clearOrder = useStore((state) => state.clearOrder)
  const total = useMemo(() => order.reduce((total, item) => total + item.subtotal, 0), [order])

  //FormData es un tipo en TS, lo incorpora automaticamente
  const handleCreateOrder = async (formData : FormData) => {
    
    const data = {
      name: formData.get('name'),
      total,
      order
    }

    //Validar con zod cliente
    const result = OrderSchema.safeParse(data)
    if(!result.success) {
      result.error.issues.forEach( (issue) => {
        toast.error(issue.message)
      })
      return
    }
    
    //Validar con zod servidor
    const response = await createOrder(data)
    if(response?.errors) {
      response.errors.forEach(issue => {
        toast.error(issue.message)
      })
      return
    }

    toast.success('Pedido realizado correctamente')
    clearOrder() //Reinicia el store
  } 

  return (
    <aside className=" lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
        <h1 className=" text-3xl text-center font-bold text-white">Mi pedido</h1>
      {order.length === 0 ?
          <p className=" text-center my-10 text-white">La ordén esta vacía</p>
        :
        <div className=" mt-5 text-white">
          {order.map(item => (
            <ProductDetails
              key={item.id}
              item={item}
            />
          ))}
          <p className="text-2xl mt-10 text-center font-semibold">Total a pagar: <span className=' font-normal'>{formatCurrency(total)}</span></p>
          
          <form className=' w-full mt-7 space-y-3'
            action={handleCreateOrder}
          >
            <input 
              type='text'
              placeholder='Ingresa tu nombre'
              className=' bg-white border border-gray-100 p-2 w-full text-gray-700'
              name='name'
            />
            <input 
              type='submit'
              className=' py-2 w-full rounded uppercase bg-amber-500 text-center cursor-pointer text-white font-bold'
              value="Confirmar pedido"
            />
          </form>
        </div>
      }
    </aside>
  )
}
