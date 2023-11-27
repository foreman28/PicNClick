```
git clone git@github.com:foreman28/PicNClick.git

git add *

git commit -m "asd"

git push
```

$ENV:NODE_TLS_REJECT_UNAUTHORIZED=0

npm -g list

cd client/src/api/test (Создание )

+-- express-generator@4.16.1      
+-- node-gyp@10.0.1               
+-- nodemon@3.0.1                 
+-- npm@10.2.1                    
+-- prisma@5.6.0                  
+-- ts-node@10.9.1                
`-- typescript@5.2.2


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