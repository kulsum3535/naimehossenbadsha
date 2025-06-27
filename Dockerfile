# Use official PHP Apache
FROM php:8.1-apache

# Clear default html folder (optional but good)
RUN rm -rf /var/www/html/*

# Copy whole project
COPY . /var/www/html/

# Enable rewrite
RUN a2enmod rewrite

# Expose port 80
EXPOSE 80
