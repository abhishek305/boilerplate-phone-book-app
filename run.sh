#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}======================================${NC}"
echo -e "${GREEN}Phone Directory Manager - Quick Start${NC}"
echo -e "${BLUE}======================================${NC}"

# Check if mode argument is provided
MODE=${1:-dev}

if [ "$MODE" = "dev" ]; then
    echo -e "${YELLOW}Starting in DEVELOPMENT mode...${NC}"
    npm run dev
elif [ "$MODE" = "prod" ] || [ "$MODE" = "production" ]; then
    echo -e "${YELLOW}Building and starting in PRODUCTION mode...${NC}"
    npm run build && npm run preview
else
    echo -e "${YELLOW}Unknown mode: $MODE. Using development mode instead.${NC}"
    npm run dev
fi