# Static production image: no Node, no npm install, no build inside Coolify.
# The React/Vite site is already built into /dist.
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
