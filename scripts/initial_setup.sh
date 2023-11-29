#!/bin/bash

set -Eeo pipefail

# Load optional value (id_rsa) or use path given
KEY_NAME=${1:-~/.ssh/id_rsa}

# Get keys into host
ssh-add "$KEY_NAME"

# Copy .env.example to .env if it is not present
if [ ! -f ".env" ]; then
    cp .env. .env
    echo "Copied .env.example to .env"
fi

# Install composer and run 'composer install'
docker exec -it template_code composer install

# Build Databases
docker exec -i moffhub_mariadb106 mysql -uroot -proot --execute="CREATE DATABASE IF NOT EXISTS template"

# Setup assets
docker exec -it template_code yarn install
docker exec -it template_code yarn run build

# Execute commands to setup laravel
docker exec -it template_code php artisan key:generate
docker exec -it template_code php artisan migrate:fresh --seed
