console.log("JavaScript file is linked."); // Ensure file is connected

(() => {
    const charactersCon = document.querySelector("#characters-con");
    const movieCon = document.querySelector("#movie-con");
    const movieTemplate = document.querySelector("#movie-template");
    const baseURL = "https://swapi.dev/api";
    let allChar = [];

    const characterImages = {
        "Anakin Skywalker": "images/anakin.jpg",
        "Wilhuff Tarkin": "images/tarkin.jpg",
        "Chewbacca": "images/chewie.jpg",
        "Han Solo": "images/han-solo.jpg",
        "Greedo": "images/greedo.jpg",
        "Jabba Desilijic Tiure": "images/jabba.jpg",
        "Wedge Antilles": "images/wedge-antilles.jpg",
        "Jek Tono Porkins": "images/jek-tono-porkins.jpg",
        "Yoda": "images/yoda.jpg",
        "Palpatine": "images/palpatine.jpg"
    };

    const movieImages = {
        "A New Hope": "images/a-new-hope.jpg",
        "The Empire Strikes Back": "images/empire-strikes-back.jpg",
        "Return of the Jedi": "images/return-of-the-jedi.jpg",
        "The Phantom Menace": "images/the-phantom-menace.jpg",
        "Attack of the Clones": "images/attack-of-the-clones.jpg",
        "Revenge of the Sith": "images/revenge-of-the-sith.jpg"
    };

    function getCharacters() {
        fetch(`${baseURL}/people/?page=2&format=json`)
            .then(response => response.json())
            .then(function(response){
                console.log(response);
                allChar = response.results;
                charactersCon.innerHTML = "";

                const ul = document.createElement("ul");

                allChar.forEach(char => {
                    const li = document.createElement("li");
                    li.classList.add("character-item");

                    const img = document.createElement("img");
                    img.src = characterImages[char["name"]];
                    img.alt = `${char["name"]}`;
                    img.classList.add("character-image");

                    const a = document.createElement("a");
                    a.textContent = char["name"];
                    a.href = "#";
                    a.dataset.films = JSON.stringify(char.films);

                    li.appendChild(img);
                    li.appendChild(a);
                    ul.appendChild(li);
                });

                charactersCon.appendChild(ul);

                document.querySelectorAll("#characters-con li a").forEach(link => {
                    link.addEventListener("click", getMovies);
                });
            })
            .catch(function(error){
                console.log(error);
            });
    }

    function getMovies(event) {
        event.preventDefault(); // prevent default behavior

        const movieURLs = JSON.parse(event.currentTarget.dataset.films || "[]"); // This was not taught in class, I watched an YouTube tutorial where the guy taught how to turn the data into a JSON.

        if (movieURLs.length === 0) {
            movieCon.innerHTML = "<p>No movie information available for this character.</p>";
            return;
        } // if statement in case the character does not appear in any movies.

        movieCon.innerHTML = ""; // clear results from previous characters

        movieURLs.forEach(movieURL => {
            fetch(movieURL)
                .then(response => response.json())
                .then(function(response){
                    console.log(response);

                    const clone = movieTemplate.content.cloneNode(true);
                    const filmOpening = clone.querySelector(".movie-opening");
                    const filmTitle = clone.querySelector(".movie-title");
                    const filmPoster = clone.querySelector(".movie-poster");

                    filmOpening.innerHTML = response.opening_crawl;
                    filmTitle.innerHTML = response.title;

                    // assigning the images for each poster
                    filmPoster.src = movieImages[response.title] || "images/default.jpg";
                    filmPoster.alt = `Poster of ${response.title}`;

                    movieCon.appendChild(clone);
                })
                .catch(function(error){
                    console.log("Error fetching movie:", error);
                });
        });
    }

    getCharacters();
})();
