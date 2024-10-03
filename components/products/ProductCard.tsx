import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardprops = {
  product : Product
}

export default function ProductCard({product}: ProductCardprops) {
  
  const imagePath = getImagePath(product.image)

  return (
    <div className=" border bg-white">
      <Image
        width={300}
        height={350}
        src={imagePath}
        alt={`Imagen platillo ${product.name}`}
        quality={100}
      />
      <div className=" p-5">
        <h3 className=" text-xl font-semibold text-zinc-600">{product.name} </h3>
        <p className=" font-bold text-2xl text-amber-500">{formatCurrency(product.price)}</p>
        <AddProductButton
          product={product}
        />
      </div>
    </div>
  )
}
