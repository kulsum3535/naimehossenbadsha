# Use official PHP + Apache base image
FROM php:8.1-apache

# Install mysqli & pdo_mysql extensions for full DB support
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Clear default Apache html folder (clean start)
RUN rm -rf /var/www/html/*

# Copy entire project to Apache root
COPY . /var/www/html/

# Enable Apache rewrite module
RUN a2enmod rewrite

# Give Apache user proper ownership to prevent permission issues
RUN chown -R www-data:www-data /var/www/html

# Optional: Set working directory explicitly (not mandatory but good practice)
WORKDIR /var/www/html

# Expose Apache default HTTP port
EXPOSE 80
