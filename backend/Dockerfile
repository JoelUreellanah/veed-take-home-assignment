FROM node:20

WORKDIR /app
COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build && ls -la dist/

CMD ["npm", "start"]