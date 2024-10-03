import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation";
import Heading from "@/components/ui/Heading";
import EditProductForm from "@/components/products/EditproductForm";
import ProductForm from "@/components/products/productForm";
import GoBackButton from "@/components/ui/GoBackButton";

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    return product
}

//params es un prop que se pasa en automatico con next.js
export default async function EditProductsPage({params}:{params: {id: string}}) {

    const product = await getProductById(+params.id)
    
    if(!product){
        //Redirecciona a una pagina 404 que comienza con el nombre not-found del segmento (en este caso de la misma carpeta)
       notFound()
    }

  return (
    <>
        <Heading>Editar producto: {product.name}</Heading>

        <div className=" flex flex-col gap-5 lg:flex-row lg:justify-between">
            <GoBackButton/>
        </div>

        {/**
         * Edit product form se ejecuta en el cliente pero su prop de children le reserva una espacio para el server
         * component
         */}
        <EditProductForm>
            <ProductForm 
                product={product}
            />
        </EditProductForm>
    </>
  )
}
