/*En next.js se puede tener APIS para esto 
    se tiene el archivo route, el nombre de sus funciones van
    a ser el verbp HTTP, los API Routes se ejecutan en el servidor
*/

import { prisma } from "@/src/lib/prisma"

export const dynamic = 'force-dynamic' //Los endpoints no se quedan en memoria cache

export async function GET() {
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
    
    return Response.json(orders)
}