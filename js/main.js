window.profileId = "d1149675-1ca1-42b8-bbf4-ff7e5973966f";
window.profileName;
window.profileBalance;
window.profileDebt;

window.profMas = {};
window.offerMas = {};
console.log("profMas.id", window.profMas.id);
const renderUser = user =>{
    if(user.name != null && user.balance!= null){
        return `
        <tr class="user">
            <td class="user_name">${user.name}</td>
            <td class="user_balance">${user.balance}</td>
            <td><label for="modal-4" onclick="getUserInfo('${user.id}')">Подробнее</label></td>
        </tr>
`
    }
};

const renderOffers = offer =>{
  return `
  <tr class="user">
            <td class="user_name">${offer.username}</td>
            <td class="user_balance">${offer.sum}</td>
            <td><label for="modal-4" onclick="getOfferInfo('${offer.id}')">Подробнее</label></td>
        </tr>
  `
};

const renderOfferId = offer =>{
      return `
      <div for="modal-4">
        <label>ID:     </label><label id="modal-user-id">${offer.id}</label><br>
        <label>ФИО:    </label><label id="modal-user-name">${offer.username}</label><br>
        <label>Предложение: </label><label id="modal-user-balance">${offer.sum}</label><br>
        <label>Просрочен:   </label><label id="modal-user-debt">${offer.isAccepted}</label><br>
        <button class="button" type="submit" onclick="offeraccept('${offer.id}')">Принять</button>
      </div>
      
`
};

const renderUserId = user =>{
  if(user.name != null && user.balance!= null){
      return `
      <div for="modal-4">
        <label>ID:     </label><label id="modal-user-id">${user.id}</label><br>
        <label>ФИО:    </label><label id="modal-user-name">${user.name}</label><br>
        <label>Баланс: </label><label id="modal-user-balance">${user.balance}</label><br>
        <label>Долг:   </label><label id="modal-user-debt">${user.debt}</label><br>
      </div>
      
`
  }
};


const addUserProfileForm = document.querySelector('#okno');

//test
// createRequest({ path: "/api/users", method: "GET" })
//   .then(response => {
//     document.querySelector("#dynamic").innerHTML = response
//       .map(renderUser)
//       .join("");
//     console.log("Результат запроса пользователей", response);
//     console.log(document.querySelector("#modal-user-id"));
//   })
//   .catch(err => {
//     document.querySelector("#users").innerHTML =
//       "Не удалось получить список пользователей";
//     console.log("Ошибка при получении списка пользователей", err);
//   });

const addUserForm = document.querySelector("#add-user");
addUserForm.addEventListener("submit", event => {
  event.preventDefault();
  const data = getFieldData(event.target);
  //console.log("main", "data", data);

  toggleClass(".add-user", "loading");

  createRequest({ path: `/api/users`, method: "POST" }, {}, data)
    .then(response => {
      toggleClass(".add-user", "loading");
      window.profMas=response;
      console.log("PROFMAS: ", window.profMas);
      localStorage.setItem("myKey", JSON.stringify(response));
      document.querySelector("#okno").innerHTML = renderUserId(window.profMas);
      
    })
    .catch(() => {
      toggleClass(".add-user", "loading");
      console.log("Не удалось добавить пользователя");
    });
});

window.profMas =JSON.parse(localStorage.getItem("myKey"));
createRequest({ path: `/api/users/${window.profMas.id}`, method: "GET" })
    .then(response => {
      document.querySelector("#okno").innerHTML = renderUserId(window.profMas);
      toggleClass(".okno", "loading");
      console.log("(2)Данные пользователя получены", response);
      console.log("(2)userID это он", window.profMas.id);
      document.querySelector("#okno").innerHTML = renderUserId(response);
    })
              
    .catch(() => {
      document.querySelector("#okno").innerHTML =
        "Пользователя с таким id не нашлось :(";
      toggleClass(".okno", "loading");
      console.log("(2)Не найден пользователь с id=", window.profMas.id);
    }
    );




function getUserInfo(userId) {
  console.log(userId);
  createRequest({ path: `/api/users/${userId}`, method: "GET" })
    .then(response => {
      document.querySelector("#one-cash").innerHTML = renderUserId(response);
      toggleClass(".add-cash", "loading");
      console.log("(1)Данные пользователя получены", response);
    })
    .catch(() => {
      document.querySelector("#one-user").innerHTML =
        "Пользователя с таким id не нашлось :(";
      toggleClass(".add-cash", "loading");
      console.log("(1)Не найден пользователь с id=", data.userId);
    });
}

function getOfferInfo(offerId) {
  console.log(offerId);
  createRequest({ path: `/api/offers/${offerId}`, method: "GET" })
    .then(response => {
      window.offerMas=response;
      localStorage.setItem("myKey1", JSON.stringify(response));
      document.querySelector("#one-cash").innerHTML = renderOfferId(response);
      toggleClass(".add-cash", "loading");
      console.log("(1)Данные офера получены", response);
    })
    .catch(() => {
      document.querySelector("#one-cash").innerHTML =
        "Офера с таким id не нашлось :(";
      toggleClass(".add-cash", "loading");
      console.log("(1)Не найден офер с id=", offerId);
    });
}
window.offerMas =JSON.parse(localStorage.getItem("myKey1"));
function offeraccept(offerId){
  createRequest({ path: `/api/offers/${offerId}/accept?userid=${window.profMas.id}`, method: "PATCH" })
    .then(response => {
      window.profMas.balance+=window.offerMas.sum;
      window.profMas.debt+=window.offerMas.sum;
      window.offerMas.isAccepted = true;
      document.querySelector("#one-cash").innerHTML = renderOfferId(response);
      toggleClass(".add-cash", "loading");
      console.log("(1)Данные офера получены", response);
    })
    .catch(() => {
      document.querySelector("#one-cash").innerHTML =
        "Офера с таким id не нашлось :(";
      toggleClass(".add-cash", "loading");
      console.log("(1)Не найден офер с id=", offerId);
    });
}

///////////////////////////////////////////////////
const addCashForm = document.querySelector('#add-cash');
addCashForm.addEventListener("submit", event => {
  event.preventDefault();
  const data = getFieldData(event.target);
  console.log("main", "data", data);
  //const userId = 'b5bffe76-dacc-4b69-aa32-cbea07d75e27';

  toggleClass(addCashForm, "loading");
  createRequest({ path: `/api/users/${window.profMas.id}/addcash?sum=${data.balance}`, method: "PATCH" }, {}, data)
    .then(response => {
      window.profMas.balance+=data.balance;
      //document.querySelector("#okno").innerHTML = renderUserId(window.profMas);
      toggleClass(".add-cash", "loading");
      console.log("Средства пополнены", response);
    })
    .catch(() => {
      document.querySelector("#add-cash").innerHTML = "Невозможно пополнить баланс";
      toggleClass(".add-cash", "loading");
      console.log("Невозможно пополнить средства");
    });
  })
  // const getOneUserForm = document.querySelector("#get-one-user");
  // getOneUserForm.addEventListener("okno", event => {
  // event.preventDefault();

  // const data = getFieldData(event.target);

  // toggleClass(".one-user", "loading");

  // createRequest({ path: "/api/users", method: "GET" })
  // .then(response => {
  //   document.querySelector("#dynamic").innerHTML = response
  //     .map(renderUser)
  //     .join("");
  //   console.log("Результат запроса пользователей", response);

  //   console.log(document.querySelector("#modal-user-id"));
    
  //   createRequest({ path: `/api/users/${window.profMas.id}`, method: "GET" })
  //   .then(response => {
  //     document.querySelector("#okno").innerHTML = renderUserId(response);
  //     toggleClass(".okno", "loading");
  //     console.log("(2)Данные пользователя получены", response);
  //     console.log("(2)userID это он", window.profileId);
  //   })
              
  //   .catch(() => {
  //     document.querySelector("#okno").innerHTML =
  //       "Пользователя с таким id не нашлось :(";
  //     toggleClass(".okno", "loading");
  //     console.log("(2)Не найден пользователь с id=", window.profileId);
  //   }
  //   );
    
  // })
  // .catch(err => {
  //   document.querySelector("#users").innerHTML =
  //     "Не удалось получить список пользователей";
  //   console.log("Ошибка при получении списка пользователей", err);
  // })

//////////////будующий патч
  // const addAddingForm = document.querySelector("#add-cash");
  // addUserForm.addEventListener("submit", event => {
  //   event.preventDefault();
  //   const data = getFieldData(event.target);
  //   //console.log("main", "data", data);
  
  //   toggleClass(".add-cash", "loading");
  
  //   createRequest({ path: `/api/users`, method: "PATCH" }, {}, data)
  //     .then(response => {
  //       toggleClass(".add-cash", "loading");
  //       console.log("Успешное пополнение баланса на сумму: ", addCash);
  //       //data = response.id;
  //      // window.profileId = response.id;;
  //     })
  //     .catch(() => {
  //       toggleClass(".add-cash", "loading");
  //       console.log("Пополнение баланса невозможно");
  //     });
  // });
 
 //});


 //получение списка оферов
 createRequest({ path: "/api/offers", method: "GET" })
  .then(response => {
    document.querySelector("#dynamic").innerHTML = response
      .map(renderOffers)
      .join("");
    console.log("Результат запроса оферов", response);

    console.log(document.querySelector("#modal-user-id"));
    
  })
  .catch(err => {
    document.querySelector("#offers").innerHTML =
      "Не удалось получить список оферов";
    console.log("Ошибка при получении списка оферов", err);
  })