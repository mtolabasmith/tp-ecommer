"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { formatPrice, categoryLabel } from "@/lib/format";
import type { Product } from "@/lib/types";

type Order = {
  id: string;
  status: string;
  total: number;
  created_at: string;
  payment_id: string | null;
};

const EMPTY = {
  id: "",
  name: "",
  category: "leyendas",
  price: "",
  stock: "",
  image_url: "",
  description: "",
};

const CATEGORIES = ["leyendas", "finales", "drops-iconicos"];

export default function AdminClient({ adminEmail }: { adminEmail: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [form, setForm] = useState({ ...EMPTY });
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );
  const [busy, setBusy] = useState(false);

  const loadProducts = useCallback(async () => {
    const res = await fetch("/api/products");
    if (res.ok) setProducts(await res.json());
  }, []);

  const loadOrders = useCallback(async () => {
    const res = await fetch("/api/orders");
    if (res.ok) setOrders(await res.json());
  }, []);

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, [loadProducts, loadOrders]);

  function resetForm() {
    setForm({ ...EMPTY });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!form.name.trim()) {
      setMessage({ type: "err", text: "El nombre es obligatorio." });
      return;
    }
    const price = Number(form.price);
    if (Number.isNaN(price) || price < 0) {
      setMessage({ type: "err", text: "Precio inválido." });
      return;
    }

    const payload = {
      name: form.name.trim(),
      category: form.category,
      price,
      stock: Number(form.stock) || 0,
      image_url: form.image_url.trim(),
      description: form.description.trim(),
    };

    setBusy(true);
    try {
      const res = form.id
        ? await fetch(`/api/products/${form.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al guardar");

      setMessage({
        type: "ok",
        text: form.id ? "Producto actualizado." : "Producto creado.",
      });
      resetForm();
      await loadProducts();
    } catch (err) {
      setMessage({
        type: "err",
        text: err instanceof Error ? err.message : "Error al guardar",
      });
    } finally {
      setBusy(false);
    }
  }

  function handleEdit(product: Product) {
    setForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      image_url: product.image_url,
      description: product.description,
    });
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este producto?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al eliminar");
      setMessage({ type: "ok", text: "Producto eliminado." });
      await loadProducts();
    } catch (err) {
      setMessage({
        type: "err",
        text: err instanceof Error ? err.message : "Error al eliminar",
      });
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await createClient().auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <main className="subpage admin">
      <header className="admin-header">
        <div>
          <div className="section-label">
            <span className="section-label-num">—</span>
            Administración
          </div>
          <h1 className="section-title">
            Panel <em>admin</em>
          </h1>
          <p className="admin-user">Conectado como {adminEmail}</p>
        </div>
        <button type="button" className="admin-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <div className="admin-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "products"}
          className={`auth-tab ${tab === "products" ? "is-active" : ""}`}
          onClick={() => setTab("products")}
        >
          Productos ({products.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "orders"}
          className={`auth-tab ${tab === "orders" ? "is-active" : ""}`}
          onClick={() => setTab("orders")}
        >
          Órdenes ({orders.length})
        </button>
      </div>

      {message && (
        <p
          className={`auth-msg ${message.type === "ok" ? "auth-msg--success" : "auth-msg--error"}`}
          role={message.type === "ok" ? "status" : "alert"}
        >
          {message.text}
        </p>
      )}

      {tab === "products" && (
        <div className="admin-products">
          <form className="admin-form" onSubmit={handleSubmit}>
            <h2 className="admin-form-title">
              {form.id ? "Editar producto" : "Nuevo producto"}
            </h2>
            <div className="admin-form-grid">
              <div className="auth-field">
                <label htmlFor="p-name">Nombre</label>
                <input
                  id="p-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="auth-field">
                <label htmlFor="p-category">Categoría</label>
                <select
                  id="p-category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {categoryLabel(c)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="auth-field">
                <label htmlFor="p-price">Precio (USD)</label>
                <input
                  id="p-price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>
              <div className="auth-field">
                <label htmlFor="p-stock">Stock</label>
                <input
                  id="p-stock"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
              </div>
              <div className="auth-field admin-field-full">
                <label htmlFor="p-image">URL de imagen</label>
                <input
                  id="p-image"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="/camisetas/..."
                />
              </div>
              <div className="auth-field admin-field-full">
                <label htmlFor="p-desc">Descripción</label>
                <textarea
                  id="p-desc"
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </div>
            <div className="admin-form-actions">
              <button type="submit" className="btn-primary" disabled={busy}>
                {form.id ? "Guardar cambios" : "Crear producto"}
              </button>
              {form.id && (
                <button type="button" className="admin-cancel" onClick={resetForm}>
                  Cancelar edición
                </button>
              )}
            </div>
          </form>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{categoryLabel(p.category)}</td>
                    <td>{formatPrice(p.price)}</td>
                    <td>{p.stock}</td>
                    <td className="admin-row-actions">
                      <button type="button" onClick={() => handleEdit(p)}>
                        Editar
                      </button>
                      <button
                        type="button"
                        className="admin-delete"
                        onClick={() => handleDelete(p.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "orders" && (
        <div className="admin-table-wrap">
          {orders.length === 0 ? (
            <p className="catalog-state">No hay órdenes todavía.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Pago</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="admin-mono">{o.id.slice(0, 8)}…</td>
                    <td>{new Date(o.created_at).toLocaleString("es-AR")}</td>
                    <td>{formatPrice(o.total)}</td>
                    <td>
                      <span className={`order-status order-status--${o.status}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="admin-mono">{o.payment_id ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </main>
  );
}
