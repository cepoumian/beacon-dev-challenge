"use server"

import dbConnect from "~/lib/db"
import Product from "~/models/products"
import { redirect } from "next/navigation"

export async function createProduct(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    slug: (formData.get("name") as string).toLowerCase().trim().replace(/\s+/g, "-"),
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    category: formData.get("category") as string,
    brand: formData.get("brand") as string,
    stock: Number(formData.get("stock")),
    image: "https://placehold.co/400x400/EBF5FB/2980B9?text=Producto",
    requiresPrescription: formData.get("requiresPrescription") === "on",
  }

  await dbConnect()
  await Product.create(data)
  redirect("/products")
}