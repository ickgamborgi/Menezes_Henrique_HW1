console.log("JavaScript file is linked."); // Ensure file is connected

(() => {
    const charactersCon = document.querySelector("#characters-con");
    const movieCon = document.querySelector("#movie-con");
    const movieTemplate = document.querySelector("#movie-template");
    const baseURL = "https://swapi.dev/api";
    let allChar = [];

    const loaderCon = document.querySelector("#loader-con");
    const loader = document.querySelector("#loader");

    const loaderMovieCon = document.querySelector("#loader-movie-con");
    const loaderMovie = document.querySelector("#loader-movie");

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

        loader.classList.remove("hidden");

        fetch(`${baseURL}/people/?page=2&format=json`)
            .then(response => response.json())
            .then(function(response){
                console.log(response);
                console.log("Characters list was successfully pulled.")
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
                console.error(error);
                const errorMessage = document.createElement("p");
                errorMessage.textContent = `We're so sorry! Apparently something went wrong, please test your internet connection or try again later — ERROR: [${error}]`;
                errorMessage.style.color = "red";

                loaderCon.innerHTML = "";
                loaderCon.appendChild(loader);
                loaderCon.appendChild(errorMessage);
            });
    }

    function getMovies(event) {
        event.preventDefault(); // prevent default behavior

        const movieURLs = JSON.parse(event.currentTarget.dataset.films || "[]"); // This was not taught in class, I watched an YouTube tutorial where the guy taught how to turn the data into a JSON.

        movieCon.innerHTML = "";
        movieCon.appendChild(loaderMovie);
        loaderMovie.classList.remove("hidden");

        movieURLs.forEach(movieURL => {
            fetch(movieURL)
                .then(response => response.json())
                .then(function(response){
                    console.log(response);
                    console.log("Movie " + response.title + " was pulled.")

                    const clone = movieTemplate.content.cloneNode(true);
                    const filmOpening = clone.querySelector(".movie-opening");
                    const filmTitle = clone.querySelector(".movie-title");
                    const filmPoster = clone.querySelector(".movie-poster");

                    filmOpening.innerHTML = response.opening_crawl;
                    filmTitle.innerHTML = response.title;

                    filmPoster.src = movieImages[response.title];

                    movieCon.appendChild(clone);

                    loaderMovie.classList.add("hidden");

                })
                .catch(function(error){
                    console.error(error);
                    const errorMessage2 = document.createElement("p");
                    errorMessage2.textContent = `We're so sorry! Apparently something went wrong, please test your internet connection or try again later — ERROR: [${error}]`;
                    errorMessage2.style.color = "red";
    
                    movieCon.innerHTML = "";
                    movieCon.appendChild(loaderMovie);
                    movieCon.appendChild(errorMessage2);
                })
        });
    }

    getCharacters();
})();
