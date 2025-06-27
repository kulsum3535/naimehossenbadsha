# Use official PHP + Apache image
FROM php:8.1-apache

# ✅ MUST: Install mysqli extension (and optionally PDO for future)
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Clear default html folder
RUN rm -rf /var/www/html/*

# Copy your project
COPY . /var/www/html/

# Enable Apache rewrite module
RUN a2enmod rewrite

# Fix permissions
RUN chown -R www-data:www-data /var/www/html

# Set working dir
WORKDIR /var/www/html

# Expose port
EXPOSE 80
