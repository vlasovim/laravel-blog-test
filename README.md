# laravel-blog-test

A simple blog with articles and comments. Built with **Laravel 13** (REST API) + **React** (SPA inside `resources/js`) + **MySQL**, containerized with Docker.

## Quick start (Docker)

### 1. Clone and configure

```bash
git clone https://github.com/vlasovim/laravel-blog-test
cd laravel-blog-test
cp .env.example .env
```

### 2. Generate application key

Run the command and paste the result into `APP_KEY` in `.env`:

**Linux / macOS / Git Bash:**
```bash
echo "base64:$(openssl rand -base64 32)"
```

### 3. Build and start containers

```bash
docker compose up -d --build
```

### 4. Run migrations and seed

```bash
docker compose exec app php artisan migrate --seed
```
