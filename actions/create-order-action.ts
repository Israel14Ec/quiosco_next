"use server"
import { OrderSchema } from "@/src/schema"
import { prisma } from "@/src/lib/prisma"

 //Directiva de use server, un serve action siempre es async y se ejecuta en el lado del servidor

export async function createOrder(data: unknown) {
    
    //Validación del servidor
    const result = OrderSchema.safeParse(data)
    
    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        })

    } catch (error) {
        console.log(error);
    }
    
}