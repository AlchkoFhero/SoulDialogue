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