// Integración con la API de Mercado Pago vía REST (sin SDK para no sumar dependencias).
// Necesita MP_ACCESS_TOKEN (token de prueba o producción) en el entorno del servidor.

const MP_TOKEN = process.env.MP_ACCESS_TOKEN;
const MP_API = "https://api.mercadopago.com";

export const isMpConfigured = Boolean(MP_TOKEN);

export type PreferenceItem = {
  title: string;
  quantity: number;
  unit_price: number;
};

/**
 * Crea una preferencia de pago y devuelve la URL de checkout (init_point).
 * external_reference = id de la orden, para poder actualizarla desde el webhook.
 */
export async function createPreference(opts: {
  orderId: string;
  items: PreferenceItem[];
  baseUrl: string;
}): Promise<string> {
  if (!MP_TOKEN) throw new Error("MP_ACCESS_TOKEN no configurado");

  const isHttps = opts.baseUrl.startsWith("https://");

  const res = await fetch(`${MP_API}/checkout/preferences`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${MP_TOKEN}`,
    },
    body: JSON.stringify({
      items: opts.items.map((i, idx) => ({
        id: String(idx),
        title: i.title,
        quantity: i.quantity,
        unit_price: Math.round(i.unit_price * 100) / 100,
        currency_id: "ARS",
      })),
      external_reference: opts.orderId,
      back_urls: {
        success: `${opts.baseUrl}/checkout/success?order=${opts.orderId}`,
        failure: `${opts.baseUrl}/checkout/success?order=${opts.orderId}&status=failure`,
        pending: `${opts.baseUrl}/checkout/success?order=${opts.orderId}&status=pending`,
      },
      // auto_return solo es válido con URLs https (no en localhost)
      ...(isHttps ? { auto_return: "approved" } : {}),
      notification_url: `${opts.baseUrl}/api/webhooks/mercadopago`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Mercado Pago rechazó la preferencia: ${detail}`);
  }

  const data = await res.json();
  return data.init_point as string;
}

/** Trae los detalles de un pago para conocer su estado y external_reference. */
export async function getPayment(paymentId: string) {
  if (!MP_TOKEN) throw new Error("MP_ACCESS_TOKEN no configurado");
  const res = await fetch(`${MP_API}/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${MP_TOKEN}` },
  });
  if (!res.ok) throw new Error("No se pudo obtener el pago de Mercado Pago");
  return res.json();
}
