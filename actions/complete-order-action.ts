"use server"
import { revalidatePath } from 'next/cache' //Revalidación en next es refrescar un componente
import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema"

export async function completeOrder(formData: FormData) {
    try {
        
        const data = {
            orderId: formData.get('order_id') //por defecto todos los valores de formData son string
        }
        const result = OrderIdSchema.safeParse(data) //Valido y transformo con zoc

        if(result.success) {
            await prisma.order.update({
                where: {
                    id: result.data.orderId
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            })
        }

        revalidatePath('/admin/orders')
    } catch (error) {
        console.log(error)
    }
}