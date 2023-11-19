import fs from "fs-extra";
import config from '../config.js';
import Mustache from 'mustache';

const DIST = config.build.dist;
const PAGES = config.build.pages;

async function renderFile(source, dest){
const file = await fs.readFile(source);
const result = Mustache.render(file.toString(), config )
await fs.writeFile(dest, result);

}

async function build() {
await fs.mkdir(DIST);

const files = await fs.readdir(PAGES);
for (const file of files) {
    if (file === "index.html") {
        await renderFile(`${PAGES}/${file}`, `dist/${file}`);
    } else {
        const folderName = file.split(".html")[0];
        await fs.mkdir(`dist/${folderName}`);
        await renderFile(`${PAGES}/${file}`, `dist/${folderName}/index.html`);
    }
}
}
build();