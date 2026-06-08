FROM node:22-alpine
ENV DATABASE_URL="file:./prisma/dev.db"
WORKDIR /usr/bov-backend
COPY . .
RUN npm install
RUN npx prisma db push
RUN npx prisma generate
