# SoulDialogue


https://souldialogue.netlify.app/

…………………………………..

7.02.2025

https://bolt.new/~/github-5ahtakmz

https://stackblitz.com/edit/github-5ahtakmz?file=README.md

…………………………………..



Запуск проекта В StackBlitz терминале выполни команду:

bash
Copy code
npm run dev
Эта команда запустит Vite локально на порту 3000.
StackBlitz автоматически создаст Preview ссылку (справа или в нижнем углу).
Открой ссылку для просмотра сайта.
Если порт занят Если порт 3000 занят или сайт не запускается, используй другой порт:

bash
Copy code
npm run dev -- --port 3001
Сборка для продакшена Чтобы собрать проект, выполни:

bash
Copy code
npm run build
Проект соберётся в папку dist/.
Размещение на Hostinger (Кратко):
Собери проект:

bash
Copy code
npm run build
Подготовь файлы:

Найди папку dist.
Архивируй её в ZIP.
Загрузи на Hostinger:

Используй File Manager или FTP.
Загрузи содержимое dist в папку public_html.
Проверка:

Открой свой сайт по домену: yourdomain.com.
Обратите внимание
Убедись, что файлы vite.config.ts и package.json верно настроены.
Если проблема остаётся, проверь:
Путь к index.html.
Правильность импорта файлов в main.tsx.
Теперь всё должно работать!





Как быстро запускать проект в будущем?
Теперь твоя папка проекта связана с Netlify, поэтому для развертывания новой версии сайта используй команды:

Собери проект:

bash
Copy code
npm run build
Задеплой на Netlify:

bash
Copy code
npx netlify deploy --prod




Отлично! Команда сработала успешно. Давайте разберем, что произошло:

Первая попытка с конкретным хешем не сработала:

bashCopygit reset --hard 49920eca
Это произошло потому, что локальный репозиторий не имел информации об этом коммите.

Мы обновили информацию о репозитории:

bashCopygit fetch origin

Затем успешно откатились на один коммит назад:

bashCopygit reset --hard HEAD~1
И получили подтверждение: HEAD is now at 49920ec Stable
Теперь ваш проект находится в стабильной версии. Индикатор ⇣ после main означает, что ваша локальная версия отстает от удаленного репозитория, что нормально в данной ситуации.
Советы на будущее:

Перед важными изменениями создавайте новую ветку:

bashCopygit checkout -b backup-branch

Для отметки стабильных версий используйте теги:

bashCopygit tag -a v1.0-stable -m "Стабильная версия 1.0"

Для просмотра изменений перед коммитом:

bashCopygit status
git diff
Хотите, я расскажу, как правильно организовать ветки в проекте, чтобы избежать подобных ситуаций в будущем?




Отлично! Давайте разберем правильную организацию веток для веб-проекта. Я объясню простым языком:

Основные ветки:

bashCopymain (или master) - основная ветка, только стабильный код
development - ветка для разработки

Создадим такую структуру:

bashCopy# Создаем ветку разработки
git checkout -b development

# Проверяем, что мы в ней
git branch

Дополнительные ветки для задач:

bashCopyfeature/ - для новых функций
bugfix/ - для исправления ошибок
hotfix/ - для срочных исправлений
release/ - для подготовки релизов
Пример рабочего процесса:

Хотите добавить новую функцию:

bashCopy# Создаем ветку от development
git checkout development
git checkout -b feature/new-contact-form

# Работаем, коммитим
git add .
git commit -m "Add new contact form"

# Когда готово, сливаем обратно в development
git checkout development
git merge feature/new-contact-form

Нашли ошибку:

bashCopygit checkout -b bugfix/header-alignment
# Исправляем, коммитим

Для релиза:

bashCopy# Создаем ветку релиза
git checkout -b release/1.0.0

# После тестирования сливаем в main и development
git checkout main
git merge release/1.0.0
git checkout development
git merge release/1.0.0

Важные команды для работы:

bashCopy# Посмотреть все ветки
git branch -a

# Переключиться на ветку
git checkout имя-ветки

# Создать и переключиться на новую ветку
git checkout -b новая-ветка

# Удалить ветку
git branch -d имя-ветки
Давайте я помогу настроить такую структуру для вашего проекта? Начнем с создания ветки development?
Также, я могу показать, как настроить GitHub Flow - это упрощенная версия такой структуры, которая может быть удобнее для небольших проектов.



Хорошо! GitHub Flow - это более простой подход, идеальный для небольших проектов. Давайте настроим:

Сначала убедимся, что мы в актуальной версии:

bashCopygit status

GitHub Flow использует такой принцип:


main - всегда содержит рабочий код
Для любых изменений создаем новую ветку

Давайте настроим:
bashCopy# 1. Убедимся, что мы в main
git checkout main

# 2. Создадим ветку для новой функции
git checkout -b feature-contact-form

# 3. Работаем над изменениями...

# 4. Коммитим изменения
git add .
git commit -m "Add contact form validation"

# 5. Пушим ветку в GitHub
git push origin feature-contact-form
Процесс работы будет таким:

Для каждой задачи:

bashCopy# Создаем новую ветку с понятным названием
git checkout -b feature-имя-функции
git checkout -b bugfix-что-исправляем

Правила названий веток:

Copyfeature-add-map
feature-new-header
bugfix-mobile-menu
hotfix-contact-form

После завершения работы:

bashCopy# Проверяем изменения
git status
git diff

# Коммитим
git add .
git commit -m "Подробное описание изменений"

# Пушим
git push origin имя-ветки

Потом через GitHub создаем Pull Request в main

Давайте попробуем? Какую функцию вы сейчас разрабатываете? Я помогу создать для неё правильную ветку.
И ещё совет: для каждой задачи пишите понятные коммиты:
bashCopy# Плохо:
git commit -m "fix"
git commit -m "update"

# Хорошо:
git commit -m "Fix header alignment on mobile devices"
git commit -m "Add phone number validation to contact form"
Хотите, покажу, как настроить шаблоны для коммитов?


Отлично! Давайте настроим шаблоны коммитов, чтобы они были информативными и последовательными.

Создадим файл шаблона. В корне проекта создайте файл .gitmessage:

bashCopy# Создаем файл
touch .gitmessage

Добавим в него шаблон:

Copy# <type>: <краткое описание>
# |<----  Максимум 50 символов  ---->|

# Подробное описание если нужно
# |<----  Максимум 72 символа в строке  ---->|

# --- ТИПЫ КОММИТОВ ---
# feat:     Новая функция
# fix:      Исправление бага
# docs:     Изменения в документации
# style:    Изменения стилей, форматирования
# refactor: Рефакторинг кода
# test:     Добавление тестов
# chore:    Обновление зависимостей и т.п.

Настроим Git на использование шаблона:

bashCopygit config --global commit.template .gitmessage

Примеры правильных коммитов:

bashCopy# Новая функция
feat: add phone validation to contact form

# Исправление бага
fix: correct header alignment on mobile

# Изменение стилей
style: update primary button colors

# Рефакторинг
refactor: simplify contact form validation logic

Дополнительно можно настроить эмодзи для типов коммитов:

Copy✨ feat:     Новая функция
🐛 fix:      Исправление бага
📝 docs:     Документация
💄 style:    Стили
♻️ refactor: Рефакторинг
✅ test:     Тесты
🔧 chore:    Конфигурация

Пример использования:

bashCopygit commit -m "✨ feat: add contact form validation

- Add phone number format check
- Add email validation
- Add required fields highlighting"
Давайте создадим этот шаблон для вашего проекта? Я помогу настроить и сделать первый коммит с использованием нового формата.
Также могу показать, как настроить автоматическую проверку формата коммитов через pre-commit hooks. Интересно?
