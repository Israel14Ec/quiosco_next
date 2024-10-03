import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/productForm";
import Heading from "@/components/ui/Heading";

export default function page() {
  return (
    <>
      <Heading>Nuevo producto</Heading>

      {/** Composition parent en next.js*/}
      <AddProductForm>
        <ProductForm/>
      </AddProductForm>
    </>
  )
}
