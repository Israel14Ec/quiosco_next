import { ReactNode } from "react"

export default function Heading({children} : { children: ReactNode}) {
  return (
    <h1 className=" text-3xl font-medium my-10 text-white">
       { children }
    </h1>
  )
}
