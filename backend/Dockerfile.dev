# get the base node image
FROM node:16

# set the working dir for container
WORKDIR /backend

# copy the json file first
COPY ./package.json /backend

# install npm dependencies
RUN npm install
RUN npm i -G nodemon
# copy other project files
COPY . .

# build the folder
CMD [ "npm", "run", "start" ]
