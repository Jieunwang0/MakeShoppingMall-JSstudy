import { renderIndex, getInitialHTML as getInitialHTMLForIndex } from "../src/pages"
import { renderSearch, getInitialHTML as getInitialHTMLForSearch } from "../src/pages/search";

export const routes = { "/": renderIndex, "/search": renderSearch };

export const getInitialHTML = {
    "/": getInitialHTMLForIndex,
    "/search": getInitialHTMLForSearch,
};