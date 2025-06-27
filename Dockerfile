FROM php:8.1-apache

# Remove default index.html if exists
RUN rm -rf /var/www/html/*

# Copy full project into Apache root
COPY . /var/www/html/

RUN a2enmod rewrite

EXPOSE 80
