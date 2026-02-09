#!/bin/bash

# UseTrack - Quick Start Script

set -e

echo "=========================================="
echo "  UseTrack - Personal Consumption Tracker"
echo "=========================================="
echo ""

# Check if PostgreSQL is running
echo "🔍 Checking PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. Please install it first."
    echo "   macOS: brew install postgresql"
    echo "   Or use Docker: docker run --name usetrack-postgres -e POSTGRES_PASSWORD=usetrack_password -e POSTGRES_DB=usetrack_db -p 5432:5432 -d postgres:15"
    exit 1
fi

echo "✅ PostgreSQL found"
echo ""

# Backend setup
echo "📦 Setting up backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "  Installing dependencies..."
    npm install
fi

# Check .env file
if [ ! -f ".env" ]; then
    echo "  Creating .env file..."
    cp .env.example .env
fi

echo "✅ Backend ready"
echo ""

# Frontend setup
echo "📦 Setting up frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "  Installing dependencies..."
    npm install
fi

echo "✅ Frontend ready"
echo ""

echo "=========================================="
echo "✨ Setup Complete!"
echo "=========================================="
echo ""
echo "📖 Next steps:"
echo ""
echo "1. Terminal 1 - Start Backend:"
echo "   cd backend && npm run start:dev"
echo ""
echo "2. Terminal 2 - Start Frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "3. Open browser:"
echo "   http://localhost:3000"
echo ""
echo "📚 Documentation: ./docs/README.md"
echo ""
