"use client"

import { searchSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation" //El next/navigation permite redireccionar

export default function ProductSearch() {

    const router = useRouter()

    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }
        const result = searchSchema.safeParse(data)

        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }

        router.push(`/admin/products/search?search=${result.data.search}`)
    }
  
    return (
    <form className=" flex items-center"
        action={handleSearchForm}
    >
        <input
            type="text"
            placeholder="Buscar producto"
            className="p-2 placeholder-gray-400 w-full"
            name="search"
        />

        <input
            type="submit"
            value="buscar"
            className=" bg-indigo-600 p-2 text-white cursor-pointer uppercase"
        />
    </form>
  )
}
