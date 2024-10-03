"use client"

import Image from 'next/image'
import { Category } from "@prisma/client"
import Link from 'next/link'
import { useParams } from 'next/navigation'

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({category} : CategoryIconProps) {

    const params = useParams()

  return (
    <div
        className={`${category.slug === params.category ? 'bg-zinc-700': ''} 
        flex items-center gap-2 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
    >
        <div className=' w-14 h-14 relative'>
            <Image
                fill
                src={`/icon_${category.slug}.svg`} 
                alt="Imagen categoria" 
            />
        </div>
        <Link 
            className={`${category.slug === params.category ? 'text-white' : 'text-zinc-600' } text-lg font-bold`}
            href={`/order/${category.slug}`}
        >
            {category.name}
        </Link>
    </div>
  )
}
