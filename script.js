let coffeeArray = [];
let searchInput = document.querySelector("#title");
let sortTitle = document.querySelector("#sortTitle");

function getData(event) {
    event.preventDefault();
    let name = document.querySelector("#name").value
    let email = document.querySelector("#email").value
    let favCoffee = document.querySelector("#favourite").value
    if (name === "" || email === "" || favCoffee === "") {
        alert("Please fill all the fields")
    } else if (email.includes("@") === false) {
        alert("Please enter a valid email")
    } else {
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        localStorage.setItem("favourite", favCoffee)
        document.querySelector("#name").value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#favourite").value = "";
    }
}

window.onload = function() {
    let name = localStorage.getItem("name")
    let email = localStorage.getItem("email")
    let favCoffee = localStorage.getItem("favourite")
    if (name && email && favCoffee) {
        alert(`Welcome ${name}, your email is ${email} and your favourite coffee is ${favCoffee}`);
    }
     if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getPositions, showError);
            } else {
                console.log("Browser doesn't support geolocation");
            }
        
        function getPositions(position) {
            document.getElementById("lat").innerText = position.coords.latitude;
            document.getElementById("lon").innerText = position.coords.longitude;
        }
        function showError(error) {
            let msg = "";
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    msg = "User Denied Permission";
                    break;
                case error.POSITION_UNAVAILABLE:
                    msg = "Not able to fetch the position";
                    break;
                case error.TIMEOUT:
                    msg = "Time out";
                    break;
                case error.UNKNOWN_ERROR:
                    msg = "Unknown error";
                    break;
            }
            displayError(msg);
        }
        function displayError(msg) {
            document.getElementById("error").innerText = msg;
        }
}

fetch("https://api.sampleapis.com/coffee/hot")
    .then(response => response.json())
    .then(data => {
        coffeeArray = data.slice(0, 8)
        displayCoffee(coffeeArray)
    })
    .catch(error => {
        alert("Failed to fetch coffee data. Please try again later.");
        console.error("Fetch error:", error);
    });

function displayCoffee(coffeeArray) {
    let container = document.querySelector("#container")
    container.innerHTML = ""
    coffeeArray.forEach(coffee => {
        let element = document.createElement("div")
        element.className = "flex flex-col items-center w-64 m-2 p-4 bg-white rounded-lg shadow"
        element.innerHTML = `
            <div class="flex flex-col items-center w-64 m-2 p-4 bg-white rounded-lg shadow">
            <img src="${coffee.image}" alt="${coffee.title}" class="w-32 h-32 object-cover rounded mb-4">
            <h2 class="text-xl font-semibold mb-2">${coffee.title}</h2>
            <p class="text-gray-600 mb-2">${coffee.description}</p>
            <p class="text-green-700 font-bold mb-1">Price: $${coffee.price}</p>
            <p class="text-sm text-gray-500">Ingredients: ${coffee.ingredients.join(", ")}</p>
            </div>
        `
        container.appendChild(element)
    })
}

searchInput.addEventListener('input', filterAndSort)
sortTitle.addEventListener('change', filterAndSort)

function filterAndSort() {
    let filtered = [...coffeeArray]
    const keyword = searchInput.value.toLowerCase()

    if (keyword) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(keyword))
    }

    const titleSort = sortTitle.value;
    if (titleSort === 'az') {
        filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (titleSort === 'za') {
        filtered.sort((a, b) => b.title.localeCompare(a.title))
    }

    displayCoffee(filtered)
}
