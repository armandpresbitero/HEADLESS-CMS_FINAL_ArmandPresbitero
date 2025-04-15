const container = document.getElementById('card-container');
const titleEl = document.getElementById('page-title');
const subtitleEl = document.getElementById('page-subtitle');
const filterEl = document.getElementById('brand-filter');

// 1. JSON string (like from a file or API)
const jsonString = `
{
  "header": {
    "title": "Top Car Models",
    "subtitle": "Explore popular cars by brand"
  },
  "cars": [
    {
      "model": "Civic",
      "brand": "Honda",
      "description": "Reliable, fuel-efficient sedan with sporty handling.",
      "image": "assets/images/civic.jpg"
    },
    {
      "model": "Corolla",
      "brand": "Toyota",
      "description": "Compact sedan with top safety features and comfort.",
      "image": "assets/images/corolla.jpg"
    },
    {
      "model": "Model 3",
      "brand": "Tesla",
      "description": "Electric sedan with fast acceleration and autopilot.",
      "image": "assets/images/model3.jpg"
    },
    {
      "model": "Mustang",
      "brand": "Ford",
      "description": "Classic American muscle car with iconic design.",
      "image": "assets/images/mustang.jpg"
    }
  ]
}
`;

// 2. Convert string to JavaScript object
const data = JSON.parse(jsonString);

// 3. Load header content
titleEl.textContent = data.header.title;
subtitleEl.textContent = data.header.subtitle;

// 4. Load cards
let carData = data.cars;
displayCards(carData);

// 5. Populate dropdown filter
const brands = [...new Set(carData.map(car => car.brand))];
brands.forEach(brand => {
  const option = document.createElement('option');
  option.value = brand;
  option.textContent = brand;
  filterEl.appendChild(option);
});

// 6. Handle brand filter
filterEl.addEventListener('change', () => {
  const selected = filterEl.value;
  if (selected === 'all') {
    displayCards(carData);
  } else {
    const filtered = carData.filter(car => car.brand === selected);
    displayCards(filtered);
  }
});

// 7. Display car cards
function displayCards(cars) {
  container.innerHTML = '';
  cars.forEach(car => {
    const card = createCard(car);
    container.appendChild(card);
  });
}

// 8. Create Bootstrap card
function createCard(car) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4 mb-4';

  col.innerHTML = `
    <div class="card h-100 shadow">
      <img src="${car.image}" class="card-img-top" alt="${car.model}">
      <div class="card-body">
        <h5 class="card-title">${car.model}</h5>
        <h6 class="card-subtitle text-muted mb-2">${car.brand}</h6>
        <p class="card-text">${car.description}</p>
      </div>
    </div>
  `;

  return col;
}
