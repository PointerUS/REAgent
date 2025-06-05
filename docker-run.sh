#!/bin/bash

# Real Estate Chatbot Docker Management Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to build the application
build() {
    print_status "Building Real Estate Chatbot application..."
    docker-compose build --no-cache
    print_status "Build completed successfully!"
}

# Function to start the application
start() {
    print_status "Starting Real Estate Chatbot application..."
    docker-compose up -d
    print_status "Application started!"
    print_status "Frontend: http://localhost:3000"
    print_status "Backend API: http://localhost:8000"
    print_status "API Documentation: http://localhost:8000/docs"
}

# Function to stop the application
stop() {
    print_status "Stopping Real Estate Chatbot application..."
    docker-compose down
    print_status "Application stopped!"
}

# Function to restart the application
restart() {
    print_status "Restarting Real Estate Chatbot application..."
    docker-compose restart
    print_status "Application restarted!"
}

# Function to show logs
logs() {
    if [ -n "$1" ]; then
        docker-compose logs -f "$1"
    else
        docker-compose logs -f
    fi
}

# Function to show status
status() {
    print_status "Application status:"
    docker-compose ps
}

# Function to clean up
clean() {
    print_warning "This will remove all containers, images, and volumes. Are you sure? (y/N)"
    read -r confirmation
    if [[ $confirmation =~ ^[Yy]$ ]]; then
        print_status "Cleaning up..."
        docker-compose down -v --rmi all --remove-orphans
        print_status "Cleanup completed!"
    else
        print_status "Cleanup cancelled."
    fi
}

# Function to show help
show_help() {
    echo "Real Estate Chatbot Docker Management Script"
    echo ""
    echo "Usage: ./docker-run.sh [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build     Build the application images"
    echo "  start     Start the application"
    echo "  stop      Stop the application"
    echo "  restart   Restart the application"
    echo "  logs      Show application logs (optional: specify service name)"
    echo "  status    Show application status"
    echo "  clean     Remove all containers, images, and volumes"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./docker-run.sh build"
    echo "  ./docker-run.sh start"
    echo "  ./docker-run.sh logs backend"
    echo "  ./docker-run.sh logs frontend"
}

# Main script
main() {
    check_docker

    case "$1" in
        build)
            build
            ;;
        start)
            start
            ;;
        stop)
            stop
            ;;
        restart)
            restart
            ;;
        logs)
            logs "$2"
            ;;
        status)
            status
            ;;
        clean)
            clean
            ;;
        help|--help|-h|"")
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

main "$@" 