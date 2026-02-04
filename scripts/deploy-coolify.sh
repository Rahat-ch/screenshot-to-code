#!/bin/bash
# Deploy to Coolify via API
# Usage: ./deploy-coolify.sh [environment]

set -e

ENV=${1:-production}
API_TOKEN="${COOLIFY_API_TOKEN:-}"
UUID="${COOLIFY_RESOURCE_UUID:-}"
COOLIFY_URL="${COOLIFY_URL:-https://coolify.rahatcodes.com}"

if [ -z "$API_TOKEN" ]; then
  echo "❌ Error: COOLIFY_API_TOKEN not set"
  echo "Get it from: Coolify → Profile → Keys & Tokens"
  exit 1
fi

if [ -z "$UUID" ]; then
  echo "❌ Error: COOLIFY_RESOURCE_UUID not set"
  echo "Get it from: Coolify → Resource → Settings → General"
  exit 1
fi

echo "🚀 Deploying to Coolify ($ENV)..."
echo "Resource: $UUID"

# Trigger deployment
curl -s -X GET \
  -H "Authorization: Bearer $API_TOKEN" \
  "$COOLIFY_URL/api/v1/deploy?uuid=$UUID&force=false" \
  | jq -r '.message // .'

echo "✅ Deploy triggered! Check Coolify dashboard for status."
