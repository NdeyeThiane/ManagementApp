FROM node:22-alpine
WORKDIR /
COPY package*.json  ./
RUN npm cache clean --force
RUN npm install -g
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]