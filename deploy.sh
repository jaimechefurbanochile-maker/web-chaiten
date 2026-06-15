#!/bin/bash
set -e

# Build en la rama actual
npm run build

# Guarda el nombre del JS generado
JS_FILE=$(ls dist/assets/index-*.js | head -1 | xargs basename)
echo "JS bundle: $JS_FILE"

# Copia dist a un lugar temporal antes de cambiar de rama
cp -r dist /tmp/web-chaiten-deploy

# Cambia a gh-pages
git checkout gh-pages

# Elimina todos los JS anteriores de assets/
git rm -f assets/index-*.js 2>/dev/null || true

# Copia el nuevo JS
cp /tmp/web-chaiten-deploy/assets/$JS_FILE assets/

# Actualiza index.html con la referencia correcta
sed -i "s|assets/index-[^\"]*\.js|assets/$JS_FILE|g" index.html

# Commit y push
git add assets/$JS_FILE index.html
git commit -m "Deploy: $JS_FILE"
git push origin gh-pages

# Limpieza y regreso
rm -rf /tmp/web-chaiten-deploy
git checkout -

echo "✓ Deployed $JS_FILE to gh-pages"
