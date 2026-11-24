# Smartland Academy — Memorika prototype

Кликабельный адаптивный RU/EN-прототип оболочки курса Memorika. Проект показывает два основных пользовательских сценария: свободную тренировку и назначенную преподавателем `AMAtraining`.

Главный экран — приложение без маркетинговой шапки и вертикальной прокрутки. Композиция пяти зданий дополнена единой белой системной шапкой с оригинальным логотипом AMAkids и названием `MEMORIKA`, четырьмя симметричными прозрачными карточками `иконка + тренажёр + локация`, архитектурным гербом с фирменным ромбом AMAkids, приветствием Минди и светлым dock AMAtraining. Маршрут домашней тренировки оформлен как пять связанных «карточек открытий» с наставником Максимусом. Актуальные ассеты — `src/assets/images/smartland-campus-v3.png`, `src/assets/images/mindy-welcome-v2.png`, `src/assets/images/mindy-settings-v1.png`, `src/assets/images/maximus-amatraining-v2.png` и `src/assets/images/amakids-logo-banner.png`.

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
- Release workflow регистрирует тег в `.github/published-version-tags.txt`; этот небольшой commit запускает Pages с уникальной версией сборки. Скопированные версии сайта в `main` не хранятся.

Текущие адреса:

- Последняя версия: [GitHub Pages](https://annaadragun.github.io/memorika-smartland-prototype/)
- `v0.9.1`: [versioned preview](https://annaadragun.github.io/memorika-smartland-prototype/versions/v0.9.1/)

Пример выпуска следующего этапа:

```sh
git tag -a v0.10.0 -m "Next design milestone"
git push origin v0.10.0
```

Workflow создания выпусков находится в [`.github/workflows/release.yml`](.github/workflows/release.yml).
Сборка актуальной и тегированных страниц выполняется в [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) только внутри GitHub Actions; копии версий не хранятся в `main`.

## Структура сценариев

```text
Кампус
├── Свободная тренировка
│   ├── Words / Слова
│   ├── Numbers / Числа
│   ├── Pictures / Картинки
│   ├── Grids / Таблицы
│   └── Настройки → показ → последовательный ответ → результат
└── AMAtraining
    └── Маршрут → задание преподавателя → упражнение → результат
```

Прямые ссылки для просмотра экранов прототипа:

- `#campus` — карта кампуса;
- `#settings/words`, `#settings/numbers`, `#settings/pictures`, `#settings/grids` — настройки тренажёров;
- `#amatraining` — маршрут домашней тренировки;
- `#amatraining/question` — вопрос Максимуса перед заданием;
- `#amatraining/fact` — ответ и интересный факт после задания.

Подробности для команды:

- [Архитектура](docs/ARCHITECTURE.md)
- [Передача разработчикам](docs/DEVELOPER-HANDOFF.md)
- [Визуальные ассеты](docs/VISUAL-ASSETS.md)

## Важно

Иллюстрация кампуса и объединённый 3D-кадр персонажей — концептуальные ассеты прототипа. Максимус сохраняет официальный образ мальчика-наставника; Минди сохраняет образ панды из учебника. Данные упражнений и прогресса демонстрационные. В репозитории не должно быть логинов учеников, `.env`-файлов, production API-ключей или персональных данных.
