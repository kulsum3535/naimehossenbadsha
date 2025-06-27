# Official PHP-Apache image
FROM php:8.1-apache

# Copy everything
COPY . /var/www/html/

# Enable rewrite (optional)
RUN a2enmod rewrite

EXPOSE 80
