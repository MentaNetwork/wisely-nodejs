FROM node
ENV DEBUG=wisely-nodejs:*
EXPOSE 3000
COPY source /app
WORKDIR /app
RUN npm install
CMD [ "npm", "start" ]
