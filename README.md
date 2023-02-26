# Shop Django&VueJS

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

1. Настроен Nginx;
2. Настроен PHP;
3. Настроена база MySQL;
4. Настроено окружение phpMyAdmin для работы с БД;

#### Сcылка на проект: `http://localhost:8080/` ;

#### Сcылка к phpMyAdmin: `http://localhost:6080/` ;

## Команды Docker

- Запуск контейнеров: `make ub` ;
- Остановка и удаление контейнеров: `make down` ;
- Зайти в нужный контейнер: `make connect_название контейнера` ;
- Зайти в контейнер с приложением и в папку src: `make connect_src` ;
- Выйти из контейнера: `exit` ;
- Остановки и удаление контейнеров с удалением Volumes: `make down_vol` ;
- Показать работающие контейнеры: `make ps` ;
- Поднятие проекта (Начать создавать контейнера): `make start` ;
- Остановка без удаления контейнеров: `make stop` ;
- Пересборка проекта: `make build` ;

## Установка Laravel

```bash
make laravel_install
```

## Установка зависимостей Node.js

```bash
make npm_install
```

## В Laravel в файле .env

- Значение константы `DB_HOST` меняем на `db` ;
- Указываем название БД в константе `DB_DATABASE` ;
- Указываем пользователя БД в константе `DB_USERNAME` ;
- Указываем пароль от БД в константе `DB_PASSWORD` ;

## Генерация ключа

```bash
make key_generate
```

## Выполнить миграции

```bash
make migrate
```

## Установка Bootstrap UI

```bash
make npm_ui
```

## Компиляция файлов JS

1. Выполнить команду `make connect_src` ;
2. Далее, в зависимости от вида компиляции, выполнить одну из команд:
   - Для разработки: `npm run dev` ;
   - Для продакшена: `npm run prod` ;
   - Для отслеживания изменений: `npm run watch` ;

## Полезные команды Docker:

1. Остановить все запущенные проекты (контейнеры) на ПК;

```bash
docker stop $(docker ps -a -q)
```

2. Удалить все данные на ПК всё что связано со созданными проектами в Docker;

- Команда удаляющая все контейнеры;

```bash
docker container prune
```

- Команда удаляющая все images;

```bash
docker image prune -a
```

- Комада удаляющая все volumes;

```bash
docker volume prune
```
