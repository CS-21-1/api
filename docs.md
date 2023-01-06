API
=======================
(*) - обозначение обязательных параметров запроса

Websites
-----------------------
## (GET) /websites
Получение сайтов и их идентификатор для свзязи в базе данных

### Параметры запроса (query):
- id (int) - Поиск сайта по дентификатору в базе данных
- domain (string) - Поиск сайта по домену
- offset (int) (По умолчанию 0) - оффсет
- limit (int) (По умолчанию 20) - лимит

Tags
-----------------------
## (GET) /tags
Получение всех тегов

### Параметры запроса (query):
-