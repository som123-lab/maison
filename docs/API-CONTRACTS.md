# Proposed Spring Boot REST API contracts

These are integration proposals for the backend team to approve. The frontend does not assume these routes exist. Align naming, response envelopes, authentication, pagination and validation with the company's reusable commerce platform before switching `VITE_USE_MOCK_API=false`.

## Request conventions

- Base URL: `VITE_API_BASE_URL` (example: `https://api.example.com/v1`)
- Store context: `X-Store-Id: maison-elan` on every store-scoped request.
- JSON request/response bodies; UTF-8.
- Authentication: secure, HttpOnly, SameSite cookies or the company's approved token strategy. Do not store production secrets in local storage.
- Money: integer minor units plus ISO-4217 currency (recommended), never floating point. The demo catalogue uses whole EUR values for readability.
- All store-scoped lookups and mutations must enforce tenant ownership on the server, including product, customer, cart, inventory and order IDs.

## Suggested resources

| Domain | Proposed endpoint | Purpose |
|---|---|---|
| Auth | `POST /auth/register` | Create customer account |
| Auth | `POST /auth/login` / `POST /auth/logout` | Start/end customer session |
| Auth | `GET /auth/me` | Current customer |
| Products | `GET /products` | Filtered, sorted, paginated catalogue |
| Products | `GET /products/{productId}` | Product details and media |
| Collections | `GET /collections` / `GET /collections/{slug}` | Collection content |
| Categories | `GET /categories` | Store taxonomy |
| Variants | `GET /products/{productId}/variants` | Size, colour and SKU variants |
| Inventory | `GET /inventory?variantId=...` | Availability by variant/location |
| Wishlist | `GET /customers/me/wishlist` | Saved items |
| Wishlist | `PUT /customers/me/wishlist/{productId}` / `DELETE ...` | Save/remove item |
| Cart | `GET /carts/current` | Current cart |
| Cart | `POST /carts/current/items` | Add a variant |
| Cart | `PATCH /carts/current/items/{lineId}` / `DELETE ...` | Change quantity/remove line |
| Customers | `GET /customers/me` / `PATCH /customers/me` | Profile |
| Customers | `GET /customers/me/addresses` / `POST ...` | Address book |
| Orders | `GET /customers/me/orders` / `GET /orders/{orderId}` | Order history/details |
| Checkout | `POST /checkout/quote` | Revalidate price, tax, shipping, inventory |
| Checkout | `POST /checkout/sessions` | Create payment-provider session |
| Checkout | `POST /checkout/sessions/{id}/confirm` | Confirm provider result / create order idempotently |

## Example product response

```json
{
  "id": "me-001",
  "storeId": "maison-elan",
  "slug": "the-atelier-coat",
  "name": "The Atelier Coat",
  "description": "A study in proportion and restraint.",
  "collection": { "id": "quiet-form", "name": "The Quiet Form" },
  "category": { "id": "outerwear", "name": "Outerwear" },
  "price": { "amount": 128000, "currency": "EUR" },
  "media": [{ "url": "https://cdn.example/...", "alt": "Atelier coat" }],
  "variants": [{ "id": "variant-001", "sku": "ME-001-36-OAT", "size": "36", "colour": "Oatmeal", "available": true }]
}
```

## Example cart mutation

```json
{
  "variantId": "variant-001",
  "quantity": 1
}
```

The server must resolve the product, current price, currency, stock and store ownership from the variant. Do not accept client-submitted prices as authoritative.

## Example checkout quote

```json
{
  "cartId": "cart-123",
  "shippingAddressId": "address-456",
  "shippingMethodId": "standard",
  "giftOptions": { "wrap": true, "message": null }
}
```

Response should contain line-level validated prices, discounts, tax, shipping, total, currency, stock reservation/expiry information and any validation issues. Payment should be delegated to a PCI-compliant provider; prefer hosted checkout or provider tokenization. Never collect or persist raw card data in this storefront.

## Error envelope

```json
{
  "code": "VARIANT_OUT_OF_STOCK",
  "message": "The selected size is no longer available.",
  "fieldErrors": [{ "field": "variantId", "code": "UNAVAILABLE" }],
  "traceId": "opaque-correlation-id"
}
```

Use appropriate HTTP statuses (`400`, `401`, `403`, `404`, `409`, `422`, `429`, `500`). The frontend API client normalizes non-2xx responses into `ApiError`; extend it to handle the final agreed response envelope and refresh/session policy.

## Frontend integration checklist

1. Agree endpoint names and response schemas with the Spring Boot team.
2. Add request/response mappers in `src/services/`; keep components using the same adapter methods.
3. Add pagination, filtering and sort parameters to `products` methods.
4. Add customer session bootstrap and logout handling.
5. Revalidate variant stock and all prices server-side on cart and checkout mutations.
6. Add idempotency keys to checkout/order creation; verify payment webhooks server-side.
7. Add loading, empty, validation and retry states for each API-backed route.
8. Enforce store isolation, authorization, rate limits, audit logging and CORS on the server.
9. Replace demo privacy, delivery and returns copy with approved merchant policies.
10. Run contract tests against a staging API before production deployment.
