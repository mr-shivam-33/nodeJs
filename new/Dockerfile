# # stage1 as builder
# FROM node:16 as builder

# # copy the package.json to install dependencies
# COPY package.json package-lock.json ./

# # Install the dependencies and make the folder
# RUN npm install && mkdir /nextjs-ui && mv ./node_modules ./nextjs-ui

# WORKDIR /nextjs-ui

# COPY . .

# # Build the project and copy the files
# RUN npm run build


# FROM nginx:alpine

# #!/bin/sh

# COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# RUN chmod 777 /usr/share/nginx/html
# ## Remove default nginx index page
# RUN rm -rf /usr/share/nginx/html/*

# # Copy from the stahg 1
# COPY --from=builder /nextjs-ui/* /usr/share/nginx/html

# EXPOSE 80

# ENTRYPOINT ["nginx", "-g", "daemon off;"]




# Use the official Node.js 14 image as the base image
FROM node:16-alpine as builder

# Set the working directory inside the container
# WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install && mkdir /app 

WORKDIR /app

# Copy the rest of the application files to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Use the official Nginx image as the base image for the production environment
FROM nginx:stable-alpine

# Permission
# RUN chmod 777 /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

RUN rm -rf /usr/share/nginx/html/*
# Copy the built files from the previous image to the Nginx image
COPY --from=builder /app/* /usr/share/nginx/html

# Copy the Nginx configuration file to the container
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]



