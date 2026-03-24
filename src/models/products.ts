import mongoose, { Schema } from "mongoose"

export interface IProduct {
  _id: mongoose.Types.ObjectId
  name: string
  slug: string
  description: string
  price: number
  category: string
  brand: string
  stock: number
  image: string
  requiresPrescription: boolean
  createdAt: Date
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, enum: ["medicamentos", "suplementos", "cuidado-personal", "dispositivos-medicos"] },
  brand: { type: String, required: true },
  stock: { type: Number, required: true },
  image: { type: String, required: true },
  requiresPrescription: { type: Boolean, required: true, default: false },
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)
export default Product