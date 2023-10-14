# Дипломный проект Movies
###### *факультет Веб-разработки Яндекс Практикума*

-----
> Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.
-----

-----
> #### Этот репозиторий содержит фронтенд часть приложения.
-----

###  Установка и запуск приложения на локальном устройстве:

* **git clone** https://github.com/HelgaMilne/movies-explorer.git - клонировать  фронтенд репозиторий,
* **git clone** https://github.com/HelgaMilne/movies-explorer-api - клонировать  бэкенд репозиторий,
* **npm install** - установить зависимости в папке frontend и в папке backend,
* **npm run dev** - запустить приложение в режиме разработчика в папке backend, используя  порт 3000,
* **npm run start** - запустить приложение в режиме разработчика в папке frontend, используя порт 3001 (или любой другой, отличный от 3000),
* сайт откроется на http://localhost:3001/

###  Реализованы возможности:

* регистрировать и авторизировать пользователя,
* редактировать профиль пользователя,
* поиска фильмов со стороннего API,
* поиск по ключевым словам, фильтрация данных поиска по длительности фильма,
* добавление / удаление избранных фильмов на свой сервер,
* переход к показу трейлера фильма при нажатии на постер,
* запоминание состояния полей ввода и блока результатов для страницы поиска фильмов,
* пагинация вывода найденных фильмов (отображение количества карточек в зависимости от ширины экрана устройства пользователя),
* адаптивный интерфейс с бургер-меню для мобильной и планшетной версии,
* защищённость роутов,
* использование собственных хуков,
* валидация всех форм на клиенте,
* валидация запросов на стороне сервера,
* гибкий UX при работе с попапами.

###  Использованы технологии:

* HTML5, CSS3, JavaScript,
* React
* Figma
* Webpack

###  Статус проекта:
<img src="https://github.com/HelgaMilne/HelgaMilne/blob/main/src/images/passed_code_review.svg" alt="badge" width="160px">

-----

#### Ссылка на макет
https://disk.yandex.ru/d/aZdOkzaVbhGFYw

#### Ссылка на репозиторий бэкенд части проекта
https://github.com/HelgaMilne/movies-explorer-api

#### Ссылка на проект

Frontend https://cinema.nomoredomains.xyz

Backend https://api.cinema.nomoredomains.xyz

-----

#### Планы по доработке проекта:

* заменить преждний сторонний API на API КиноПоиска
* сообщения от сервера  оформить всплывающим модальным окном


