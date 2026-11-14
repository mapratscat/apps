# Repositori d'aplicacions i artefactes de Miquel Àngel

Aquest repositori es publica amb GitHub Pages (branca `main`, carpeta arrel) a
`https://mapratscat.github.io/apps/`. Cada aplicació viu en una carpeta pròpia.

## Com publicar un artefacte nou

1. Tria un nom de carpeta curt i descriptiu: minúscules, sense accents ni espais,
   paraules separades amb guions (p. ex. `rubrica-debat`).
2. Desa la pàgina com a `<carpeta>/index.html`. Si té fitxers auxiliars (imatges,
   CSS, JS), van dins la mateixa carpeta amb rutes relatives.
3. Afegeix una entrada a la llista `apps` de l'`index.html` de l'arrel
   (carpeta, títol, descripció d'una línia).
4. Fes commit i push directament a `main`. La pàgina queda disponible en un o dos
   minuts a `https://mapratscat.github.io/apps/<carpeta>/`.
5. Retorna a l'usuari l'enllaç final.

## Requisits de les pàgines

- Han de ser autònomes: HTML/CSS/JS estàtic. No poden dependre de capacitats
  exclusives de claude.ai (`window.claude`, base de dades compartida, preguntes a
  Claude, dades connectades). Si l'artefacte original en fa servir, cal adaptar-lo
  (p. ex. `localStorage`) o avisar l'usuari abans de publicar.
- Biblioteques externes només des de CDN amb versió fixada.
- El repositori és públic: mai no s'hi publiquen dades personals d'estudiants,
  qualificacions ni informació confidencial. Revisa el contingut abans de pujar-lo.
- Idioma de la interfície: el de l'artefacte (per defecte, català).
