const endPoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

const prom = fetch(endPoint)
  .then((item) => item.json())
  .then((data) => cities.push(...data));

const search = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

function handleSearch(wordSearch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordSearch, "gi");

    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayResults() {
  const matchSearch = handleSearch(this.value, cities);

  const html = matchSearch
    .map((item) => {
      const regex = new RegExp(this.value, "gi");

      const cityName = item.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      const stateName = item.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      return `<li>
    <span class="name">${cityName}, ${stateName}</span>
    <span class="population">${item.population}</span>
    </li>`;
    })
    .join("");

  suggestions.innerHTML = html;
}

search.addEventListener("change", displayResults);
search.addEventListener("keyup", displayResults);
