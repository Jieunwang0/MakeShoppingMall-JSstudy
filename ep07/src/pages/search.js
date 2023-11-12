
export function renderSearch({ searchParams }) {
    console.log(searchParams);
    document.querySelector("#app").innerHTML = `
  <h1>search page</h1>
  <p>keyword: ${searchParams.query}</p>`;
}
