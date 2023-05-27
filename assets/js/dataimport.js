(async function () {

  const responce = await fetch('assets/api/db.json');
  const restaurants = await responce.json();
  displayRestaurant(restaurants);

  function displayRestaurant(restaurants) {
    const shopsContainer = document.querySelector('.shops-list');
    shopsContainer.innerHTML = '';

    for (const restaurant of restaurants) {
      shopsContainer.innerHTML += `
      <li class="list-group-item" onclick="loadMenu(this.getAttribute('restaurantID'))" restaurantID="${restaurant.id}"><span class="shop-name"><img class="shop-logo" scr="${restaurant.logo}">${restaurant.name}</span></li>`;
    }
  }
})();

async function loadMenu(restaurantID) {
  const response = await fetch('assets/api/db.json')
    .then(response => response.json())
    .then(data => {
      const selectedRestaurant = data.find(restaurant => restaurant.id === restaurantID);
      console.log(restaurantID);
      if (selectedRestaurant) {
        displayItems(selectedRestaurant);
      } else {
        console.log('Object not found!');
      }
    })
    .catch(error => console.error('Error:', error));


  function displayItems(restaurantObj) {
    const menuContainer = document.querySelector('.menu-container');
    menuContainer.innerHTML = '';

    for (const item of restaurantObj.menu) {
      menuContainer.innerHTML += `
          <div class="menu-container">
          <div class="card">
              <p class="menu-item-price">$${item.price}</p><img src="${item.image}" class="card-img w-100 d-block">
              <div class="card-body">
                  <h4 class="card-title">${item.name}</h4>
                  <p class="card-text">${item.description}</p><button class="btn btn-primary buy-btn" type="button">Buy</button>
              </div>
          </div>`;
    }
  }
};





