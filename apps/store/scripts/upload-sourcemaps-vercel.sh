#!/usr/bin/env bash

set -eou pipefail

if [ "${VERCEL_ENV:-}" != "production" ]; then
  echo "Not running in Vercel production environment, skipping upload of sourcemaps to Datadog"
  exit 0
fi

echo "Attempting to upload sourcemaps to Datadog..."

yarn workspace store exec \
  datadog-ci sourcemaps upload .next/static \
  --project-path="apps/store" \
  --service="${NEXT_PUBLIC_DATADOG_SERVICE_NAME}" \
  --release-version="${NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF}_${NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA}" \
  --disable-git \
  --repository-url="https://github.com/HedvigInsurance/racoon" \
  --minified-path-prefix="https://www.hedvig.com/_next/static"

echo "Uploaded sourcemaps to Datadog"
