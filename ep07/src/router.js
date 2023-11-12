
let routes;

window.addEventListener("popstate", (e) => {
    if (routes[location.pathname]) {
        routes[location.pathname]();
        return;
    }
});

export const goto = (url, { push } = {}) => {
    const pathname = url.split("?")[0];
    const params = Object.fromEntries(new URLSearchParams(url.split("?")[1]));
    console.log(params);
    if (routes[pathname]) {
        if (push) {
            history.pushState({}, "", url);
        }
        routes[pathname]({
            searchParams: params,
        });
        return;
    }
    location.href = url;
};

export const start = (params) => {
routes = params.routes;
    goto(location.pathname + location.search);
}