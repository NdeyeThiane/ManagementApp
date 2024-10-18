FROM node:22-alpine
WORKDIR /
COPY package*.json ./
RUN npm cache clean --force
RUN npm install
COPY  . .
RUN npm run build
RUN npm install -g serve
EXPOSE 5173
# CMD server -s build
CMD ["npm", "run", "dev"]