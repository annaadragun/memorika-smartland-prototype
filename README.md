# Smartland Academy — Memorika prototype

Кликабельный адаптивный RU/EN-прототип оболочки курса Memorika. Проект показывает два основных пользовательских сценария: свободную тренировку и назначенную преподавателем Нейротренировку.

[![Deploy prototype to GitHub Pages](https://github.com/annaadragun/memorika-smartland-prototype/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/annaadragun/memorika-smartland-prototype/actions/workflows/deploy-pages.yml)

Публичная версия: [annaadragun.github.io/memorika-smartland-prototype](https://annaadragun.github.io/memorika-smartland-prototype/)

## Где находится страница

- Исходный код: [`src/`](src/)
- Главная страница: [`src/index.html`](src/index.html)
- Стили: [`src/styles/app.css`](src/styles/app.css)
- Поведение: [`src/scripts/app.js`](src/scripts/app.js)
- Переводы и демонстрационные данные: [`src/scripts/data/content.js`](src/scripts/data/content.js)
- Изображения: [`src/assets/images/`](src/assets/images/)

## Локальный запуск

```sh
npx serve src
```

Можно также открыть `src/` через Live Server в редакторе. Отдельной сборки нет.

## Автодеплой GitHub Pages

Workflow находится в [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

После каждого push в `main` GitHub Actions:

1. забирает актуальный репозиторий;
2. загружает `src/` в GitHub Pages;
3. публикует новую версию страницы.

Ручной запуск также доступен через `workflow_dispatch`.

## Версии и Releases

- `main` всегда публикуется как актуальная версия GitHub Pages.
- Теги формата `v*` автоматически создают GitHub Release.
- Каждый Release привязан к конкретному commit и содержит стандартные ZIP/TAR-архивы этой версии.
- Каждый тег также получает отдельный интерактивный адрес `versions/<tag>/`.

Текущие адреса:

- Последняя версия: [GitHub Pages](https://annaadragun.github.io/memorika-smartland-prototype/)
- `v0.1.0`: [versioned preview](https://annaadragun.github.io/memorika-smartland-prototype/versions/v0.1.0/)

Пример выпуска следующего этапа:

```sh
git tag -a v0.2.0 -m "Campus and navigation update"
git push origin v0.2.0
```

Workflow создания выпусков находится в [`.github/workflows/release.yml`](.github/workflows/release.yml).
Сборка актуальной и тегированных страниц выполняется в [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) только внутри GitHub Actions; копии версий не хранятся в `main`.

## Структура сценариев

```text
Кампус
├── Свободная тренировка
│   └── Настройки → показ → ответ → результат
└── Нейротренировка
    └── Маршрут → миссия → упражнение → карточка-открытие
```

Подробности для команды:

- [Архитектура](docs/ARCHITECTURE.md)
- [Передача разработчикам](docs/DEVELOPER-HANDOFF.md)

## Важно

Иллюстрации кампуса и персонажей — концептуальные AI-ассеты прототипа, а данные упражнений и прогресса демонстрационные. В репозитории не должно быть логинов учеников, `.env`-файлов, production API-ключей или персональных данных.
