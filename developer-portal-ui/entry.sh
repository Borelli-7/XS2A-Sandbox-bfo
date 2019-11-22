#!/bin/sh
export DOLLAR='$'

envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
envsubst < /usr/share/nginx/html/assets/UI/envLinks.template.json > /usr/share/nginx/html/assets/UI/envLinks.json

nginx -g "daemon off;"
