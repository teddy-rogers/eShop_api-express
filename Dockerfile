FROM node:14
EXPOSE 8000
WORKDIR /app
COPY package.json package-lock.json /app/
COPY tsconfig.json /app/
COPY . /app/
RUN npm install
RUN npm install tsc -g
RUN npm run generate:schemas
RUN npm run build
CMD node dist/index.js/
