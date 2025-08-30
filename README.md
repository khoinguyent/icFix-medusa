# icFix Medusa Project

A complete e-commerce solution built with Medusa backend and Next.js storefront, orchestrated with Docker Compose.

## Project Structure

```
icFix-medusa/
├── backend/           # Medusa backend API
├── storefront/        # Next.js storefront
├── docker-compose.yml # Global orchestration
└── README.md
```

## Services

- **Backend**: Medusa API server (port 9000)
- **Storefront**: Next.js frontend (port 3000)
- **Admin**: Medusa admin panel (port 7000) - *temporarily disabled*
- **PostgreSQL**: Database (port 5432)
- **Redis**: Caching layer (port 6379)

## Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)
- Git

## Quick Start

### 1. Clone and Setup

```bash
git clone git@github.com:khoinguyent/icFix-medusa.git
cd icFix-medusa
```

### 2. Start All Services

```bash
docker-compose up -d
```

This will start all services:
- Database will be available at `localhost:5432`
- Backend API at `http://localhost:9000`
- Storefront at `http://localhost:3000`
- Admin panel at `http://localhost:7000` (temporarily disabled)

### 3. View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f storefront
```

### 4. Stop Services

```bash
docker-compose down
```

## Development

### Backend Development

The backend is a Medusa v2 project with:
- TypeScript support
- PostgreSQL database
- Redis caching
- Hot reloading enabled

### Storefront Development

The storefront is a Next.js application with:
- TypeScript support
- Medusa client integration
- Hot reloading enabled

### Database

- **Host**: localhost (or postgres from docker network)
- **Port**: 5432
- **Database**: medusa
- **Username**: medusa
- **Password**: medusa

## Environment Variables

### Backend
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: JWT signing secret
- `COOKIE_SECRET`: Cookie encryption secret
- `STORE_CORS`: Storefront CORS origin
- `ADMIN_CORS`: Admin panel CORS origin
- `AUTH_CORS`: Authentication CORS origin

### Storefront
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL`: Backend API URL

## Useful Commands

```bash
# Rebuild and restart services
docker-compose up -d --build

# Reset database
docker-compose down -v
docker-compose up -d

# Access database
docker-compose exec postgres psql -U medusa -d medusa

# Access backend container
docker-compose exec backend sh

# Access storefront container
docker-compose exec storefront sh
```

## Troubleshooting

### Port Conflicts
If ports are already in use, modify the `docker-compose.yml` file to use different ports.

### Database Connection Issues
Ensure PostgreSQL container is running and healthy:
```bash
docker-compose ps postgres
```

### Build Issues
Clear Docker cache and rebuild:
```bash
docker-compose build --no-cache
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker Compose
5. Submit a pull request

## License

MIT
