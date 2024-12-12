FROM node:18
WORKDIR /usr/src/app
ENV PORT=8080
COPY . .
RUN npm install 
ENV MODEL_URL='https://storage.googleapis.com/ibs-app-ml-bucket/model-in-prod/model.json'
EXPOSE 8080
CMD [ "npm", "run", "start" ]
