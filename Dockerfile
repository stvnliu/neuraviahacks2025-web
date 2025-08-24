FROM node
WORKDIR /frontend

COPY ./ /frontend

CMD ["npm", "install", "&&", "npm", "run", "build", "&&", "mkdir", "-p", "../api/public/", "&&", "cp", "-r", "./dist/*", "../api/public/"]

