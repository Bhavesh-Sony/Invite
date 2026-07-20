#!/usr/bin/env bash
# Run on a fresh Ubuntu 22.04/24.04 EC2 instance (as ubuntu or with sudo).
set -euo pipefail

DOMAIN="${1:-}"
REPO_URL="${2:-https://github.com/Bhavesh-Sony/Invite.git}"
WEB_ROOT="/var/www/invite"

if [[ -z "$DOMAIN" ]]; then
  echo "Usage: sudo bash setup-ec2.sh yourdomain.com"
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y nginx git certbot python3-certbot-nginx

rm -rf "$WEB_ROOT"
git clone --depth 1 "$REPO_URL" "$WEB_ROOT"
chown -R www-data:www-data "$WEB_ROOT"

sed "s/YOUR_DOMAIN.com/$DOMAIN/g" "$WEB_ROOT/deploy/nginx-invite.conf" \
  > /etc/nginx/sites-available/invite
ln -sf /etc/nginx/sites-available/invite /etc/nginx/sites-enabled/invite
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl restart nginx

certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "admin@$DOMAIN" || true

echo ""
echo "Site deployed to $WEB_ROOT"
echo "Point your domain A record to this server's Elastic IP."
