# YamiTao

Static website (HTML/CSS/JS, no build step). Published with GitHub Pages at
`https://kpyglobal.github.io/YamiTao/`.

## Structure

```
index.html      page markup only
css/style.css   all styling
js/data.js      content: foods, recipes, villages, rules, islands
js/i18n.js      UI text per language (zh / en / tao)
js/map.js       Pacific voyaging map + starfield
js/app.js       state, rendering, interactions, chat assistant
```

Scripts load in that order from `index.html`. To change site content, edit `js/data.js`;
to change interface wording, edit `js/i18n.js`.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Contributing

Work on a branch and open a pull request; `main` is protected.
