#!/bin/bash
set -e

# Cria o banco de dados de teste
mysql -u root -p"${MYSQL_ROOT_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS solztt;"
