#!/bin/bash

# Копирование содержимого nginx.conf в /etc/nginx/sites-available/default
sudo cp nginx.conf /etc/nginx/sites-available/default

# Проверка корректности конфигурации
sudo nginx -t

# Перезагрузка Nginx для применения новых настроек
sudo systemctl reload nginx
