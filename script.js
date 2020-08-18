const searchButton = document.getElementById("search-btn");
const lyricsSearchInput = document.getElementById("lyrics-search-input");

const result = document.getElementById("result");

//SEARCH API CALL

function searchLyrics(searchValue) {
  fetch(`https://api.lyrics.ovh/suggest/${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      const result = data.data;
      const resultsInTen = result.slice(0, 10);
      console.log(resultsInTen);
      renderData(resultsInTen);

      //   for (let i = 0; i < resultsInTen.length; i++) {
      //     const artistName = resultsInTen[i].artist.name;
      //     console.log(artistName);
      //   }

      //   for (let i = 0; i <= result.length - 5; i++) {
      //     console.log(i);

      //   }
    });
}
//RENDERING LYRICS TO THE DOM WITH API CALL
function getLyrics(artist, dataSongTitle) {
  fetch(`https://api.lyrics.ovh/v1/${artist}/${dataSongTitle}`)
    .then((res) => res.json())
    .then((data) => {
      const lyrics = data.lyrics.replace(/(?:\r|\n|\r\n)/g, "<br>");
      result.innerHTML = `<h2 class="text-success mb-4">${dataSongTitle} - ${artist}</h2><br>
                <h3 class="font-weight-light">${lyrics}<h3>
      `;
    });
}

//RENDERING lyrics list data;
function renderData(data) {
  let output = "";
  data.forEach((element) => {
    output += `
                   <li>

                   <div class="single-result row align-items-center my-3 p-3">
                   <div class="col-md-9">
                     <h3 class="lyrics-name">${element.title}</h3>
                     <p class="author lead">Album by <span>${element.artist.name}</span></p>
                   </div>
                   <div class="col-md-3 text-md-right text-center">
                     <button class="btn btn-success" data-artist="${element.artist.name}" data-songtitle="${element.title}" >Get Lyrics</button>
                   </div>
                 </div>
                 </li>
                 `;
  });
  result.innerHTML = `
  <ul class="songs">
          ${output}
  </ul>
  `;
}

//EVENT LISTENERS
searchButton.addEventListener("click", function () {
  const searchValue = lyricsSearchInput.value;

  if (!searchValue) {
    alert("you must enter something");
  } else {
    searchLyrics(searchValue);
  }
});

result.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const artist = e.target.getAttribute("data-artist");
    const dataSongTitle = e.target.getAttribute("data-songtitle");
    console.log(artist, dataSongTitle);

    getLyrics(artist, dataSongTitle);
  }
});
