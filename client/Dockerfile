FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN npm i
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 5173
CMD ["npm", "run", "build"]