FROM gliderlabs/alpine:3.1

ENV PORT 8888

RUN apk-install php php-mysqli php-json php-xml

WORKDIR /app

COPY . /app

CMD php -S 0.0.0.0:$PORT
