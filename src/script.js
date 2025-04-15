const container = document.getElementById('card-container');
const titleEl = document.getElementById('page-title');
const subtitleEl = document.getElementById('page-subtitle');
const filterEl = document.getElementById('brand-filter');

// Load JSON file using fetch
fetch('data/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load JSON");
    }
    return response.json();
  })
  .then(data => {
    // Set header
    titleEl.textContent = data.header.title;
    subtitleEl.textContent = data.header.subtitle;

    // Load and display cars
    const carData = data.cars;
    displayCards(carData);

    // Populate filter dropdown
    const brands = [...new Set(carData.map(car => car.brand))];
    brands.forEach(brand => {
      const option = document.createElement('option');
      option.value = brand;
      option.textContent = brand;
      filterEl.appendChild(option);
    });

    // Filter functionality
    filterEl.addEventListener('change', () => {
      const selected = filterEl.value;
      if (selected === 'all') {
        displayCards(carData);
      } else {
        const filtered = carData.filter(car => car.brand === selected);
        displayCards(filtered);
      }
    });
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
    container.innerHTML = `<p class="text-danger">Failed to load car data.</p>`;
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
      <img src="${car.image}" class="card-img-top img-fluid" alt="${car.model}">
      <div class="card-body">
        <h5 class="card-title">${car.model}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${car.brand}</h6>
        <p class="card-text">${car.description}</p>
      </div>
    </div>
  `;

  return col;
}
