"use client"
import useSWR from 'swr'
import Logo from '@/components/ui/Logo'
import React from 'react'
import { OrderWithProducts } from '@/src/types'
import Spinner from '@/components/ui/Spinner/Spinner'
import LatestOrderItem from '@/components/order/LatestOrderItem'

export default function OrdersPage() {
    const url = '/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data =>data)
    const { data, isLoading} = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 60000,
        revalidateOnFocus: false
    })

    if(isLoading) return (<div className="flex flex-col justify-center items-center h-[calc(100%-30px)]">
        <Spinner />
        <p className=" text-white text-xl">Cargando</p>
      </div>
    )
  if (data) return (
    <>
        <div className=' flex gap-2 justify-center items-center'>
            <h1 className=' text-white text-center mt-20 text-5xl font-semibold'>Ordenes Listas</h1>
            <Logo/>
        </div>

        { data.length ? (
            <div className=' grid grid-cols-1 gap-5 max-w-4xl mx-auto mt-10'>
                {data.map(order => (
                    <LatestOrderItem
                        key={order.id}
                        order={order}
                    />
                ))}
            </div>
        ): <p className=' text-center text-white font-bold text-xl'>No hay ordenes listas</p>}
    </>
  )
}
