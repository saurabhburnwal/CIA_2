let coffeeArray = [];
let searchInput = document.querySelector("#title");
let sortTitle = document.querySelector("#sortTitle");

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburgerSpans = hamburger.querySelectorAll('span');
    
    hamburger.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        if (mobileMenu.classList.contains('hidden')) {
            hamburgerSpans[0].style.transform = 'rotate(0deg)';
            hamburgerSpans[1].style.opacity = '1';
            hamburgerSpans[2].style.transform = 'rotate(0deg)';
        } else {
            hamburgerSpans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburgerSpans[1].style.opacity = '0';
            hamburgerSpans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        }
    });
    
    const titleMobile = document.querySelector("#titleMobile");
    if (titleMobile) {
        searchInput.addEventListener('input', function() {
            titleMobile.value = this.value;
            filterAndSort();
        });
        
        titleMobile.addEventListener('input', function() {
            searchInput.value = this.value;
            filterAndSort();
        });
    }
});

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

fetch("https://fake-coffee-api.vercel.app/api")
    .then(response => response.json())
    .then(data => {
        coffeeArray = data.slice(0, 8)
        displayCoffee(coffeeArray)
    })
    .catch(error => {
        console.log("Primary API failed, trying backup...");
        return fetch("https://api.jsonbin.io/v3/b/63c872c815ab31599e2d4f8a")
            .then(response => response.json())
            .then(data => {
                const coffeeData = [
                    {
                        id: 1,
                        title: "Espresso",
                        description: "A strong black coffee made by forcing steam through ground coffee beans.",
                        image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400",
                        ingredients: ["Espresso beans", "Water"]
                    },
                    {
                        id: 2,
                        title: "Cappuccino",
                        description: "Espresso with steamed milk foam on top.",
                        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400",
                        ingredients: ["Espresso", "Steamed milk", "Milk foam"]
                    },
                    {
                        id: 3,
                        title: "Latte",
                        description: "Espresso with steamed milk and a small amount of milk foam.",
                        image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400",
                        ingredients: ["Espresso", "Steamed milk", "Milk foam"]
                    },
                    {
                        id: 4,
                        title: "Americano",
                        description: "Espresso diluted with hot water.",
                        image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400",
                        ingredients: ["Espresso", "Hot water"]
                    },
                    {
                        id: 5,
                        title: "Mocha",
                        description: "Espresso with chocolate syrup and steamed milk.",
                        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
                        ingredients: ["Espresso", "Chocolate syrup", "Steamed milk", "Whipped cream"]
                    },
                    {
                        id: 6,
                        title: "Macchiato",
                        description: "Espresso with a dollop of steamed milk foam.",
                        image: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=400",
                        ingredients: ["Espresso", "Steamed milk foam"]
                    },
                    {
                        id: 7,
                        title: "Frappé",
                        description: "Iced coffee drink blended with ice and milk.",
                        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
                        ingredients: ["Coffee", "Ice", "Milk", "Sugar"]
                    },
                    {
                        id: 8,
                        title: "Cold Brew",
                        description: "Coffee brewed with cold water over an extended period.",
                        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400",
                        ingredients: ["Coarse ground coffee", "Cold water"]
                    }
                ];
                coffeeArray = coffeeData;
                displayCoffee(coffeeArray);
            });
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
