"use client"
import useSWR from "swr";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";
import Spinner from "@/components/ui/Spinner/Spinner";

/*
//Obtiene las ordenes
async function getPendingOrders() {
  const orders = await prisma.order.findMany({
    where: {
      status: false
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })

  return orders
}*/

export default function Page() {
  //const orders = await getPendingOrders()
  //Este codigo usa SWR
  const url = '/admin/orders/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 6000, //Se refrezca cada 1 minuto
    revalidateOnFocus: false
  })

  if(isLoading) return (<div className="flex flex-col justify-center items-center h-[calc(100%-30px)]">
    <Spinner />
    <p className=" text-white text-xl">Cargando</p>
  </div>)


  if (data) return (
    <>
      <Heading>
        Administrar Ordenes
      </Heading>

      {/**Se usa el form para recargar las ordenes*/}
      {/* 
        <form action={ async () => {
        "use server"
        //Revalido el path para refrezcar
        revalidatePath('/admin/orders')
      }}>
        <input
          type="submit"
          value="Actualizar ordenes"
          className=" bg-amber-400 w-full lg:w-auto text-lg px-5 py-3 font-bold cursor-pointer text-white"

        />
      </form>
      */}
      
      {data.length ? 
        (
          <div className=" grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {data.map(order => (
              <OrderCard
                key={order.id}
                order={order}
              />
            ))}
          </div>
        ): <p className="text-center text-gray-100 text-2xl font-semibold">No hay ordenes pendientes</p> 
      }
    </>
  )
}
