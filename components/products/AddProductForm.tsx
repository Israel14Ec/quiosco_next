"use client" //Componente de cliente

import { createProct } from "@/actions/create-product-action";
import { ProductSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
//Se esta utilizando un server component desde un client componente,
/**
 * Un client component se puede renderizar en un server component, un server component no se puede 
 * renderizar en un client component
 */
import { ReactNode } from "react";
import { toast } from "react-toastify";

export default function AddProductForm({children} : { children: ReactNode}) {

  const router = useRouter()

  //Server action
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      price: formData.get('price'),
      categoryId: formData.get('categoryId'),
      image: formData.get('image')
    }
    
    const result = ProductSchema.safeParse(data)
    if(!result.success) {
      result.error.issues.forEach(issue => toast.error(issue.message))
      return
    }
    const response = await createProct(result.data)
    if(response?.errors) {
      response.errors.forEach(issue => toast.error(issue.message))
      return
    }

    toast.success('Producto creado correctamente')
    router.push('/admin/products')
  }

  return (
    <div className=" bg-white mt-5 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
        <form 
            className=" space-y-5"
            action={handleSubmit}
        >
            {children}
            
            <input
                type="submit"
                className=" bg-gray-600 hover:bg-gray-800 text-white w-full p-3 uppercase fon-bold cursor-pointer"
                value="Registrar producto"
            />
        </form>
    </div>
  )
}
