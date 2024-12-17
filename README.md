# SoulDialogue

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/AlchkoFhero/SoulDialogue)


Размещение на Hostinger
На Hostinger можно загрузить статический сайт, используя FTP или встроенный File Manager. Вот пошаговая инструкция:

1. Подготовь файлы для загрузки
После сборки проекта с помощью npm run build у тебя должна быть папка dist, содержащая файлы:
index.html (основная страница сайта)
папка assets/ (стили, изображения и скрипты)
Сожми папку dist в архив .zip, чтобы загрузить на хостинг.

2. Вход в Hostinger
Зайди в панель управления Hostinger.
Перейди в раздел Files → File Manager или FTP-менеджер.

3. Загрузка файлов
Через File Manager:
Перейди в папку public_html (основная директория сайта).
Удали старые файлы, если они есть.
Загрузите архив dist.zip и распакуй его прямо в папке public_html.

Через FTP:
Используй FTP-клиент, например, FileZilla.
Подключись к серверу Hostinger (указав хост, логин и пароль).
Загрузите содержимое папки dist/ в директорию public_html.

4. Проверка сайта
Перейди на свой домен (например, yourdomain.com) и проверь, что сайт работает.

Важно:
Убедись, что _redirects файл из Netlify не нужен, так как Hostinger не поддерживает такие настройки. 
Вместо этого можно настроить .htaccess, если требуется.
Теперь у тебя есть готовый сайт на Hostinger и быстрый запуск в StackBlitz! 


SITE: souldialogue.top

https://souldialogue.netlify.app/


Run site locally:
npx vite preview --port 3000



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