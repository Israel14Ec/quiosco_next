import { prisma } from "@/src/lib/prisma"
import CategoryIcon from "../ui/CategoryIcon";
import Logo from "../ui/Logo";

async function getCategories() {
    return await prisma.category.findMany()
}

//El código puede ser asuncrono solo si se esta en el lado del servidor
export default async function OrderSidebar() {

  const categories = await getCategories()
    
  return (
    <aside className="md:w-72 h-screen bg-white">
        <Logo/>
        <nav className=" mt-10">
          {categories.map(category => (
            <CategoryIcon
              key={category.id}
              category={category}
            />
          ))}
        </nav>
    </aside>
  )
}
