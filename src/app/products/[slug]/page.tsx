import Image from "next/image"
import Link from "next/link"
import dbConnect from "~/lib/db"
import Product, { IProduct } from "~/models/products"
import { notFound } from "next/navigation"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  await dbConnect()
  const product = await Product.findOne({ slug }).lean<IProduct>()
  if (!product) return { title: "Producto no encontrado" }
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  await dbConnect()
  const product = await Product.findOne({ slug }).lean<IProduct>()

  if (!product) notFound()

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <Image 
        src={product.image} 
        alt={product.name} 
        width={800} 
        height={400}
        unoptimized
        className="w-full rounded-lg mb-6" 
        />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-500 mb-1">{product.brand}</p>
      <p className="text-blue-600 font-bold text-2xl mb-4">${product.price}</p>
      <p className="text-gray-700">{product.description}</p>
      <Link href="/products" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Volver a productos
      </Link>
    </main>
  )
}