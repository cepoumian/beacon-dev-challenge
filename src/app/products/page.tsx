import dbConnect from "~/lib/db"
import Product, { IProduct } from "~/models/products"
import Link from "next/link"
import Image from "next/image"
import { Suspense } from "react"
import ProductFilters from "~/components/ProductFilters"

interface Props {
  searchParams: Promise<{ category?: string; search?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category, search } = await searchParams
  
  await dbConnect()
  
  const query: Record<string, unknown> = {}
  if (category) query.category = category
  if (search) query.name = { $regex: search, $options: "i" }

  const products = await Product.find(query).lean<IProduct[]>()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Productos</h1>
      {/* porque useSearchPArams dentro de ProductFilters lo require  */}
      <div className="flex justify-between">
          <Suspense>
            <ProductFilters />
          </Suspense>
          <Link href="/products/new" className="rounded-lg bg-blue-600 px-4 py-2 self-start text-white hover:bg-blue-700">
           + Nuevo Producto
          </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link key={product._id.toString()} href={`/products/${product.slug}`}>
            <div key={product._id.toString()} className="rounded-lg border p-4 shadow-sm">
              <Image 
                src={product.image}
                alt={product.name} 
                width={400} 
                height={400}
                unoptimized
                className="w-full rounded mb-3" 
                />
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-500 text-sm">{product.brand}</p>
              <p className="text-blue-600 font-bold mt-2">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}