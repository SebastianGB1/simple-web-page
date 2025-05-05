# Online Store Catalogue API Documentation

## ✅ Functional Requirements

- List all products with filtering, sorting, and pagination
- View a single product
- Create, update, and delete products (admin only)
- List all categories
- Manage categories (admin only)
- Filter products by category, price range, and keywords
- Authenticate users (admin & customer roles)

## ⚙️ Non-Functional Requirements

- RESTful architecture (Richardson Maturity Model Level 3)
- JSON-based communication (`application/json`)
- Secure endpoints via token-based authentication (JWT)
- Rate limiting for API abuse prevention
- Pagination for large datasets
- Caching for read-heavy endpoints
- Error messages with descriptive details
- API versioning (e.g. `/api/v1/`)
- Response times ≤ 300ms for 95% of requests

## 📘 Entities

### 🔹 Product

| Field         | Type     | Description         |
|---------------|----------|---------------------|
| `id`          | UUID     | Unique product ID   |
| `name`        | string   | Name of the product |
| `description` | string   | Details             |
| `price`       | float    | Cost in USD         |
| `image_url`   | string   | URL to image        |
| `category_id` | UUID     | Linked category     |
| `created_at`  | datetime | Auto-generated      |
| `updated_at`  | datetime | Auto-updated        |

### 🔹 Category

| Field  | Type   | Description        |
|--------|--------|--------------------|
| `id`   | UUID   | Unique category ID |
| `name` | string | Category name      |

## 🔐 Authentication

- **Method**: Bearer Token (JWT)
- **Endpoints without auth**:
  - `GET /products`
  - `GET /products/{id}`
  - `GET /categories`
- **Admin required**:
  - POST, PUT, DELETE on `/products` and `/categories`

## 📎 API Endpoints

### 📁 Products

#### `GET /api/v1/products`

**Description**: List products with filters, sorting, pagination

**Query Params**:
- `category_id`, `min_price`, `max_price`, `search`
- `page` (default: 1), `limit` (default: 10)
- `sort_by`: `price`, `created_at`
- `order`: `asc`, `desc`

**Responses**:
- `200 OK` – Returns list of products
- `400 Bad Request` – Invalid query params

**Caching**: Yes (with query string as cache key) – TTL: 10 min

#### `GET /api/v1/products/{id}`

**Description**: Retrieve a specific product

**Responses**:
- `200 OK` – Returns product
- `404 Not Found` – Product doesn't exist

**Caching**: Yes – TTL: 30 min

#### `POST /api/v1/products`

**Auth**: Admin only  
**Body**:

```json
{
  "name": "Product Name",
  "description": "Details",
  "price": 29.99,
  "image_url": "https://...",
  "category_id": "uuid"
}
```

**Responses:**

- `201 Created` – Product created

- `400 Bad Request` – Invalid input

- `401 Unauthorized` – No token provided

- `403 Forbidden` – Not admin


### `PUT /api/v1/products/{id}`

**Auth: Admin only**

**Body: Same as POST**

**Responses:**

- `200 OK` – Updated

- `400 Bad Request` – Invalid data

- `404 Not Found` – Product doesn't exist

- `403 Forbidden` – Not allowed

### `DELETE /api/v1/products/{id}`

**Auth: Admin only**

**Body: Same as POST**

**Responses:**

- `204 No content` – Successfully deleted

- `404 Not Found` – Product doesn't exist

## Richardson Maturity Model

| Level | Description                             | Supported      |
| ----- | --------------------------------------- | -------------- |
| 0     | Single endpoint                         | ❌              |
| 1     | Resources exposed as URIs               | ✅              |
| 2     | HTTP verbs used correctly               | ✅              |
| 3     | HATEOAS (hypermedia links in responses) | ✅ (*optional*) |

## Error handling

all error structured JSON:
```json
{
  "error": "BadRequest",
  "message": "Invalid price range",
  "status": 400,
  "timestamp": "2025-05-05T12:00:00Z"
}

```

### **Common status codes:**

- `400` – Invalid input

- `401` – Missing/invalid token

- `403` – Access denied

- `404` – Resource not found

- `500` – Internal server error

## Caching Strategy

| Endpoint                  | Cache? | TTL        |
| ------------------------- | ------ | ---------- |
| `GET /products`           | ✅      | 10 minutes |
| `GET /products/{id}`      | ✅      | 30 minutes |
| `GET /categories`         | ✅      | 1 hour     |
| `POST/PUT/DELETE` methods | ❌      | No caching |

## Pagination Format

Used on all list endpoints (GET /products, GET /categories if needed):

```json
{
  "items": [/* data */],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "total_pages": 10
  }
}
```
