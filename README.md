# Shop Django&VueJS

![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Bulma](https://img.shields.io/badge/bulma-00D0B1?style=for-the-badge&logo=bulma&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
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
