# Use uma imagem base PHP com FPM
FROM php:8.2-fpm

# Defina o diretório de trabalho
WORKDIR /var/www/html

# Instale dependências do sistema, incluindo a versão mais recente do Node.js e npm
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_current.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Instale dependências do sistema e extensões PHP
RUN apt-get update && apt-get install -y \
    apache2 \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libxml2-dev \
    libonig-dev \
    libcurl4-openssl-dev \
    libmariadb-dev \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip xml exif mbstring curl soap \
    && rm -rf /var/lib/apt/lists/*

COPY ./docker/apache.conf /etc/apache2/sites-available/000-default.conf

# Habilite o módulo do PHP-FPM no Apache
RUN a2enmod proxy_fcgi setenvif \
    && a2enmod actions

# Instale Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copie o código da aplicação
COPY . /var/www/html

# Instale dependências PHP
RUN composer install --optimize-autoloader --no-dev

# Exponha a porta que o PHP-FPM vai usar
EXPOSE 80

# Defina o comando para iniciar o PHP-FPM
CMD ["apache2-foreground"]