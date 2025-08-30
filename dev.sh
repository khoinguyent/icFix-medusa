#!/bin/bash

# icFix Medusa Development Script

case "$1" in
  "start")
    echo "🚀 Starting all services..."
    docker-compose up -d
    echo "✅ Services started!"
    echo "📊 Backend: http://localhost:9000"
    echo "🛍️  Storefront: http://localhost:3000"
    echo "⚙️  Admin: http://localhost:7000 (disabled)"
    echo "🗄️  Database: localhost:5432"
    ;;
  "stop")
    echo "🛑 Stopping all services..."
    docker-compose down
    echo "✅ Services stopped!"
    ;;
  "restart")
    echo "🔄 Restarting all services..."
    docker-compose down
    docker-compose up -d
    echo "✅ Services restarted!"
    ;;
  "logs")
    echo "📋 Showing logs..."
    docker-compose logs -f
    ;;
  "build")
    echo "🔨 Building all services..."
    docker-compose build --no-cache
    echo "✅ Build complete!"
    ;;
  "clean")
    echo "🧹 Cleaning up..."
    docker-compose down -v
    docker system prune -f
    echo "✅ Cleanup complete!"
    ;;
  "status")
    echo "📊 Service status:"
    docker-compose ps
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|logs|build|clean|status}"
    echo ""
    echo "Commands:"
    echo "  start   - Start all services"
    echo "  stop    - Stop all services"
    echo "  restart - Restart all services"
    echo "  logs    - Show service logs"
    echo "  build   - Rebuild all services"
    echo "  clean   - Clean up containers and volumes"
    echo "  status  - Show service status"
    exit 1
    ;;
esac
