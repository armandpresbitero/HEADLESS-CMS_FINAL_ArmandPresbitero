const container = document.getElementById('card-container');
const titleEl = document.getElementById('page-title');
const subtitleEl = document.getElementById('page-subtitle');
const filterEl = document.getElementById('brand-filter');

let carData = [];

fetch('../public/data.json')
  .then(response => response.json())
  .then(data => {
    // Load header
    titleEl.textContent = data.header.title;
    subtitleEl.textContent = data.header.subtitle;

    // Load cars
    carData = data.cars;
    displayCards(carData);

    // Populate brand filter
    const brands = [...new Set(data.cars.map(car => car.brand))];
    brands.forEach(brand => {
      const option = document.createElement('option');
      option.value = brand;
      option.textContent = brand;
      filterEl.appendChild(option);
    });
  })
  .catch(err => console.error('Error loading JSON:', err));

// Handle filter
filterEl.addEventListener('change', () => {
  const selected = filterEl.value;
  if (selected === 'all') {
    displayCards(carData);
  } else {
    const filtered = carData.filter(car => car.brand === selected);
    displayCards(filtered);
  }
});

function displayCards(cars) {
  container.innerHTML = '';
  cars.forEach(car => {
    const card = createCard(car);
    container.appendChild(card);
  });
}

function createCard(car) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4 mb-4';

  col.innerHTML = `
    <div class="card h-100 shadow">
      <img src="${car.image}" class="card-img-top" alt="${car.model}">
      <div class="card-body
