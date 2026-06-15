#!/bin/bash
set -e

# Build en la rama actual
npm run build

# Guarda los nombres de los archivos generados
JS_FILE=$(ls dist/assets/index-*.js  | head -1 | xargs basename)
CSS_FILE=$(ls dist/assets/index-*.css | head -1 | xargs basename)
echo "JS bundle:  $JS_FILE"
echo "CSS bundle: $CSS_FILE"

# Copia dist a un lugar temporal antes de cambiar de rama
cp -r dist /tmp/web-chaiten-deploy

# Cambia a gh-pages
git checkout gh-pages

# Elimina assets anteriores
git rm -f assets/index-*.js  2>/dev/null || true
git rm -f assets/index-*.css 2>/dev/null || true

# Copia los nuevos assets (mkdir por si assets/ quedó vacío)
mkdir -p assets
cp /tmp/web-chaiten-deploy/assets/$JS_FILE  assets/
cp /tmp/web-chaiten-deploy/assets/$CSS_FILE assets/

# Actualiza index.html con referencias correctas
sed -i "s|assets/index-[^\"]*\.js|assets/$JS_FILE|g"   index.html
sed -i "s|assets/index-[^\"]*\.css|assets/$CSS_FILE|g" index.html

# Commit y push
git add assets/$JS_FILE assets/$CSS_FILE index.html
git commit -m "Deploy: $JS_FILE + $CSS_FILE"
git push origin gh-pages

# Limpieza y regreso
rm -rf /tmp/web-chaiten-deploy
git checkout -

echo "✓ Deployed $JS_FILE + $CSS_FILE to gh-pages"
