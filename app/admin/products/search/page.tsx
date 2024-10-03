import ProductSearch from "@/components/products/ProductSearch";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function searchProducts(searchTerm: string) {

    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })

    return products
}


//SearchParams es un prop que se pasa en automatico
export default async function SearchPage ({searchParams} : {searchParams: {search: string}}) {
    
    const search = searchParams.search
    const products = await searchProducts(search)
    
    return (
    <>
        <Heading>Resultados de búsqueda: <span className=" text-amber-500 font-normal">{searchParams.search}</span></Heading>

        <div className=" flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href={'/admin/products/new'}
          className=" bg-amber-400 w-full lg:w-auto text-lg px-5 py-3 font-bold cursor-pointer"
        >
          Crear Producto
        </Link>
        <ProductSearch/>
      </div>

        { products.length ? (
            <ProductTable 
                products={products}
            />
        ):<p className=" text-center mt-5 text-lg text-gray-50 font-bold">No hay resultados</p>
        }

    </>
  )
}
