# Use official PHP + Apache base image
FROM php:8.1-apache

# ✅ Install mysqli (must be before COPY!)
RUN docker-php-ext-install mysqli

# Clear Apache default html dir
RUN rm -rf /var/www/html/*

# Copy your project files
COPY . /var/www/html/

# Enable Apache rewrite module
RUN a2enmod rewrite

# Give Apache user permission
RUN chown -R www-data:www-data /var/www/html

# Optional: Set working dir
WORKDIR /var/www/html

# Expose port 80
EXPOSE 80
