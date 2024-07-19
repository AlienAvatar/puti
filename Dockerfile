# Start your image with a node base image
FROM node:apline

# The /app directory should act as the main application directory
WORKDIR /puti

# Copy the app package and package-lock.json file
COPY package.json /puti/package.json
COPY package-lock.json /puti/package-lock.json

RUN npm install

COPY . /puti

ENV CI=true

CMD [ "npm", "start" ]

RUN npm run build

# Copy local directories to the current local directory of our docker image (/app)
# COPY ./src ./src
# COPY ./public ./public

# Install node packages, install serve, build the app, and remove dependencies at the end
# RUN npm cache clean --force \
#     && npm install \
#     && npm run build

EXPOSE 3000

# Start the app using serve command
# CMD [ "serve", "-s", "build" ]
