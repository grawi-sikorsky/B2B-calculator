#!/usr/bin/env bash
# Jedyny sekret potrzebny B2B-calculator to dostęp do GHCR (obraz jest prywatny w praktyce
# pull-side, ten sam wzorzec co portfolio/dev-whisper deployment/k8s/*/create-secrets.sh).
# Wołane z CI po eksporcie GH_USER/GH_TOKEN.
set -euo pipefail

NAMESPACE="b2b-calculator"

kubectl -n "$NAMESPACE" create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username="$GH_USER" \
  --docker-password="$GH_TOKEN" \
  --dry-run=client -o yaml | kubectl apply -f -
