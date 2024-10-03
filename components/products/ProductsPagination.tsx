import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

type ProductsPaginationProps = {
    page: number
    totalPages: number
}

export default function ProductsPagination({page, totalPages} : ProductsPaginationProps) {

    const isDisabled = page >= totalPages;
    const isDisabledMin = page <= 1    
    const isCurrentPage = (currentPage: number )=> page === currentPage         

    //Paginacion: genero un array con array from en función del totalPages
    const pages =Array.from({length: totalPages}, (_,i) => i+1)

    return (
    <nav className=" flex justify-center items-center py-2 mt-2 gap-2">
        <Link 
            href={`/admin/products?page=${page-1}`}
            className={` text-gray-900 bg-white p-2 ${isDisabledMin && 'opacity-20 pointer-events-none'}`}
            aria-disabled={isDisabledMin}
        >
            <ChevronLeftIcon className=" w-5"/>
        </Link>

        { pages.map(currentPage => (
            <Link href={`/admin/products?page=${currentPage}`}
                key={currentPage}
                className={`${isCurrentPage(currentPage) ? ' text-amber-500': 'text-white '}`}
            >
                {currentPage}
            </Link>
        ))}

        <Link
            href={`/admin/products?page=${page+1}`}
            className={`text-gray-900  bg-white p-2 ${isDisabled && 'opacity-50 pointer-events-none'}`}
            aria-disabled={isDisabled}
        >
            <ChevronRightIcon className="w-5"/>
        </Link>
    </nav>
  )
}
