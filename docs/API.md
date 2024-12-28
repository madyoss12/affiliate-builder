# API Documentation

## Authentication

### POST /api/auth/register
Create a new user account.

```typescript
interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface RegisterResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  session: string;
}
```

### POST /api/auth/login
Authenticate a user.

```typescript
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  session: string;
}
```

## Sites

### GET /api/sites
Get all sites for the authenticated user.

```typescript
interface Site {
  id: string;
  name: string;
  domain: {
    name: string;
    customDomain: string | null;
  };
  template: string;
  createdAt: string;
  statistics: {
    visitors: number;
    pageviews: number;
    conversions: number;
    revenue: number;
  };
}

type GetSitesResponse = Site[];
```

### POST /api/sites
Create a new site.

```typescript
interface CreateSiteRequest {
  name: string;
  domain: string;
  template: string;
}

interface CreateSiteResponse {
  id: string;
  name: string;
  domain: {
    name: string;
    customDomain: null;
  };
  template: string;
  createdAt: string;
}
```

### PUT /api/sites/:id
Update a site.

```typescript
interface UpdateSiteRequest {
  name?: string;
  customDomain?: string;
  template?: string;
}

type UpdateSiteResponse = Site;
```

### DELETE /api/sites/:id
Delete a site.

```typescript
// No request body needed
// Returns 204 No Content on success
```

## Analytics

### GET /api/sites/:id/analytics
Get analytics for a site.

```typescript
interface GetAnalyticsRequest {
  startDate: string; // ISO date
  endDate: string; // ISO date
  metrics?: string[]; // Optional metrics to include
}

interface Analytics {
  visitors: {
    total: number;
    unique: number;
    returning: number;
  };
  pageviews: {
    total: number;
    perPage: {
      path: string;
      views: number;
    }[];
  };
  conversions: {
    total: number;
    rate: number;
    bySource: {
      source: string;
      count: number;
    }[];
  };
  revenue: {
    total: number;
    byProduct: {
      product: string;
      amount: number;
    }[];
  };
}
```

## Templates

### GET /api/templates
Get all available templates.

```typescript
interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: string;
  features: string[];
}

type GetTemplatesResponse = Template[];
```

## Error Responses

All endpoints may return the following error responses:

```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```

Common error codes:
- `AUTH_REQUIRED`: Authentication is required
- `INVALID_INPUT`: Invalid input data
- `NOT_FOUND`: Resource not found
- `FORBIDDEN`: User doesn't have permission
- `RATE_LIMITED`: Too many requests
- `SERVER_ERROR`: Internal server error
