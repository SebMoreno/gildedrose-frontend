# BUILD
FROM node:alpine AS frontend-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# DEPLOY
FROM nginx:alpine
COPY --from=frontend-build /app/dist/praxis-fe /usr/share/nginx/html
COPY docker/nginx-conf /etc/nginx/conf.d/
ENV API_HOST_IP=localhost
ENV API_HOST_PORT=8080
CMD envsubst '$API_HOST_URL,$API_HOST_PORT' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
EXPOSE 80
