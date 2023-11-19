```
git clone git@github.com:foreman28/PicNClick.git

git add *

git commit -m "asd"

git push
```

# Старт:

1. Склонировать репозиторий:
```
git clone git@github.com:foreman28/PicNClick.git
```

2. Установить зависимости:
```
npm install
```

3. Сгенерировать типы:
```
npx prisma generate
```

4. Создать базу данных и сделать миграцию:
```
npx prisma migrate dev
```

5. Перейти в директорию client и установить зависимости:
```
cd client
npm install
```

6. Запустить проект:
```
npm run dev
```