FROM php:8.1-apache

COPY . /var/www/html/

# Change DocumentRoot to /var/www/html/webapp
RUN sed -i 's|/var/www/html|/var/www/html/webapp|g' /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite

EXPOSE 80
