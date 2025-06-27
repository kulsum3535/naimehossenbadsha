# Use official PHP + Apache image
FROM php:8.1-apache

# Install mysqli extension for DB connection
RUN docker-php-ext-install mysqli

# Clear default Apache html folder
RUN rm -rf /var/www/html/*

# Copy everything into Apache root
COPY . /var/www/html/

# Enable Apache rewrite module
RUN a2enmod rewrite

# Give proper permissions (optional but safer for uploads or logs)
RUN chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80
