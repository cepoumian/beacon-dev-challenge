import { createProduct } from "../actions"

export default function NewProductPage() {
  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Nuevo Producto</h1>
      <form action={createProduct} className="flex flex-col gap-4">
        <input name="name" placeholder="Nombre" required className="border rounded px-4 py-2" />
        <input name="brand" placeholder="Marca" required className="border rounded px-4 py-2" />
        <input name="price" type="number" placeholder="Precio" required className="border rounded px-4 py-2" />
        <input name="stock" type="number" placeholder="Stock" required className="border rounded px-4 py-2" />
        <select name="category" required className="border rounded px-4 py-2">
          <option value="">Selecciona categoría</option>
          <option value="medicamentos">Medicamentos</option>
          <option value="suplementos">Suplementos</option>
          <option value="cuidado-personal">Cuidado Personal</option>
          <option value="dispositivos-medicos">Dispositivos Médicos</option>
        </select>
        <textarea name="description" placeholder="Descripción" required className="border rounded px-4 py-2" />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="requiresPrescription" />
          Requiere receta
        </label>
        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 cursor-pointer hover:bg-blue-700">
          Crear Producto
        </button>
      </form>
    </main>
  )
}