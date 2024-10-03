import { prisma } from "@/src/lib/prisma";

export const dynamic = 'force-dynamic' //Los endpoints no se quedan en memoria cache

export async function GET() {
    const orders = await prisma.order.findMany({
      take: 5,
      where: {
        orderReadyAt: {
            not: null
        }
      } ,
      orderBy: {
        orderReadyAt: 'desc'
      },
      include: {
        orderProducts: {
            include: {
                product: true
            }
        }
      }
    })

    return Response.json(orders)
}