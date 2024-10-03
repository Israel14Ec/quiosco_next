import Image from "next/image"

export default function Logo() {
  return (
    <div className=" flex justify-center mt-5">
        <div className=" relative w-36 h-36">
            <Image
                fill
                alt="Logotipo Fresh Coffe"
                src='/logo.svg'
                priority  // Esta propiedad le dice a Next.js que priorice la carga de esta imagen
            />
        </div>
    </div>
  )
}
