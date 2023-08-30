FROM php:8.2-fpm

ARG NODE_VERSION=18

RUN apt-get update && apt-get install -y \
    apt-transport-https \
    curl \
    git \
    gnupg \
    libbz2-dev \
    libfreetype6-dev \
    libghc-postgresql-libpq-dev \
    libicu-dev \
    libjpeg62-turbo-dev \
    libmagickwand-dev \
    libonig-dev \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    lsb-release \
    mariadb-client \
    openssl \
    supervisor \
    unzip \
    vim \
    wget \
    zip \
    libfontconfig && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install calendar zip intl pdo pdo_mysql bcmath opcache
RUN docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/
RUN docker-php-ext-install gd
RUN docker-php-ext-install bz2

RUN pecl install redis xdebug
RUN docker-php-ext-enable redis
RUN docker-php-ext-enable xdebug

COPY ./config/php.ini /usr/local/etc/php/

WORKDIR /code

# Make sure we're installing what we think we're installing!
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

RUN curl -sL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash - \
    && apt-get install -y nodejs

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
COPY ./start.sh /usr/local/bin/start
RUN chown -R $user: /code \
    && chmod u+x /usr/local/bin/start
RUN sed -i -e "s/pm.max_children\s*=\s*[0-9]*/pm.max_children = 30/g" /usr/local/etc/php-fpm.d/www.conf
RUN sed -i -e "s/pm.max_spare_servers\s*=\s*[0-9]*/pm.max_spare_servers = 10/g" /usr/local/etc/php-fpm.d/www.conf
RUN sed -i -e "s/;pm.max_requests\s*=\s*[0-9]*/pm.max_requests = 500/g" /usr/local/etc/php-fpm.d/www.conf
RUN sed -i -e "s/access.log/;access.log/g" /usr/local/etc/php-fpm.d/docker.conf

ENV PATH "$PATH:/root/.yarn/bin"

EXPOSE 9000
CMD ["/usr/local/bin/start"]
