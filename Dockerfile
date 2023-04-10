FROM node:17
EXPOSE 8000
WORKDIR /api
COPY package.json package-lock.json /api/
COPY tsconfig.json /api/
COPY . /api/
RUN npm install
RUN npm install tsc -g
RUN npm run generate:schemas
RUN npm run build
CMD node dist/index.js/
