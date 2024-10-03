import { redirect } from "next/navigation";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ProductSearch from "@/components/products/ProductSearch";

//Obtiene el total de productos
async function productCount () {
  return await  prisma.product.count()
}

//Obtiene los productos paginados
async function getProducts (page:number, pageSize:number) {
  
  const skip = (page -1) *pageSize //Calcula el salto
  const products = await prisma.product.findMany({
    take: pageSize, //Igual a Limit en SQL
    skip, //Salta n cantidad de los registros 
    include: {
      category: true
    }
  })
  return products
}

//Obtiene el tipo de dato que  devuelve getProducts
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts> >


//SearchParams lo injecta next.js automaticamente
export default async function productsPage({ searchParams} : { searchParams: {page: string}}) {

  const page = +searchParams.page || 1
  const pageSize = 10  

  if(page < 1) redirect('/admin/products')

  const productsData =  getProducts(page, pageSize)
  const totalProductsData = productCount()
  const [ products, totalProducts ] = await Promise.all([productsData, totalProductsData])
  const totalPages = Math.ceil(totalProducts / pageSize)

  if(page > totalPages) {
    redirect('/admin/products')
  }

  return (
    <>
      <Heading>
        Administrar productos
      </Heading>

      <div className=" flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href={'/admin/products/new'}
          className=" bg-amber-400 w-full lg:w-auto text-lg px-5 py-3 font-bold cursor-pointer text-white"
        >
          Crear Producto
        </Link>
        <ProductSearch/>
      </div>

      <ProductTable
        products={products}
      />

      <ProductsPagination
        page={page}
        totalPages={totalPages}
      />
       
    </>
  )
}
