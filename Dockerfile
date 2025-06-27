FROM php:8.1-apache

COPY . /var/www/html/

# Change DocumentRoot
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/webapp|g' /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite

EXPOSE 80
