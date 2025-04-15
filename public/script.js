document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('card-container');
  const titleEl = document.getElementById('page-title');
  const subtitleEl = document.getElementById('page-subtitle');
  const filterEl = document.getElementById('brand-filter');

  fetch('./data/data.json') // Assuming your data.json is in the root directory
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to load data.json');
      }
      return res.json();
    })
    .then(data => {

      titleEl.textContent = data.header.title;
      subtitleEl.textContent = data.header.subtitle;

      let cars = data.cars;
      displayCards(cars);


      const brands = [...new Set(cars.map(car => car.brand))];
      brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        filterEl.appendChild(option);
      });


      const allOption = document.createElement('option');
      allOption.value = 'all';
      allOption.textContent = 'All Brands';
      filterEl.prepend(allOption);


      filterEl.addEventListener('change', () => {
        const selected = filterEl.value;
        if (selected === 'all') {
          displayCards(cars);
        } else {
          const filtered = cars.filter(car => car.brand === selected);
          displayCards(filtered);
        }
      });
    })
    .catch(err => {
      console.error("Error loading JSON:", err);

      titleEl.textContent = 'Error';
      subtitleEl.textContent = 'Failed to load data. Please try again later.';
    });


  function displayCards(cars) {
    container.innerHTML = '';
    cars.forEach(car => {
      container.appendChild(createCard(car));
    });
  }


  function createCard(car) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${car.image}" class="card-img-top" alt="${car.model}">
        <div class="card-body">
          <h5 class="card-title">${car.model}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${car.brand}</h6>
          <p class="card-text">${car.description}</p>
        </div>
      </div>
    `;
    return col;
  }
});
