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
      setMessage({ type: "err", text: "Name is required." });
      return;
    }
    const price = Number(form.price);
    if (Number.isNaN(price) || price < 0) {
      setMessage({ type: "err", text: "Invalid price." });
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
      if (!res.ok) throw new Error(data.error ?? "Error saving");

      setMessage({
        type: "ok",
        text: form.id ? "Product updated." : "Product created.",
      });
      resetForm();
      await loadProducts();
    } catch (err) {
      setMessage({
        type: "err",
        text: err instanceof Error ? err.message : "Error saving",
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
    if (!confirm("Delete this product?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error deleting");
      setMessage({ type: "ok", text: "Product deleted." });
      await loadProducts();
    } catch (err) {
      setMessage({
        type: "err",
        text: err instanceof Error ? err.message : "Error deleting",
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
            Administration
          </div>
          <h1 className="section-title">
            Admin <em>panel</em>
          </h1>
          <p className="admin-user">Signed in as {adminEmail}</p>
        </div>
        <button type="button" className="admin-logout" onClick={handleLogout}>
          Sign out
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
          Products ({products.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "orders"}
          className={`auth-tab ${tab === "orders" ? "is-active" : ""}`}
          onClick={() => setTab("orders")}
        >
          Orders ({orders.length})
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
              {form.id ? "Edit product" : "New product"}
            </h2>
            <div className="admin-form-grid">
              <div className="auth-field">
                <label htmlFor="p-name">Name</label>
                <input
                  id="p-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="auth-field">
                <label htmlFor="p-category">Category</label>
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
                <label htmlFor="p-price">Price (USD)</label>
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
                <label htmlFor="p-image">Image URL</label>
                <input
                  id="p-image"
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="/camisetas/..."
                />
              </div>
              <div className="auth-field admin-field-full">
                <label htmlFor="p-desc">Description</label>
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
                {form.id ? "Save changes" : "Create product"}
              </button>
              {form.id && (
                <button type="button" className="admin-cancel" onClick={resetForm}>
                  Cancel editing
                </button>
              )}
            </div>
          </form>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
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
                        Edit
                      </button>
                      <button
                        type="button"
                        className="admin-delete"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
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
            <p className="catalog-state">No orders yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td className="admin-mono">{o.id.slice(0, 8)}…</td>
                    <td>{new Date(o.created_at).toLocaleString("en-US")}</td>
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
