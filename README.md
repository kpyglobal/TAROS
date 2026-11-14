# YamiTao

> ## ⚠️ EXPERIMENTAL PROJECT: NOT FOR RELIANCE
>
> This project is **experimental and for descriptive and demonstration purposes only**.
> It is a work in progress. Content may be incomplete, inaccurate, unverified or changed at any time.
>
> - **No endorsement.** Nothing here reflects, represents or is endorsed by any person,
>   community, organization or institution, including anyone named, referenced or
>   affiliated with the project.
> - **Not authoritative.** Do not treat any content as official, verified or complete,
>   and do not rely on it for research, policy, cultural, medical, dietary or any other decisions.
> - **Cultural content.** Any material about Indigenous or community knowledge is placeholder
>   material pending review by the relevant community. It must not be reused, republished
>   or cited as community-approved.
> - **No warranty.** Provided "as is", without liability of any kind.
> - **All rights reserved.** Public visibility is not permission to reuse. See [LICENSE](LICENSE).

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
