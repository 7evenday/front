window.profileId = "d1149675-1ca1-42b8-bbf4-ff7e5973966f";
window.profileName;
window.profileBalance;
window.profileDebt;
const renderUser = user =>{
    if(user.name != null && user.balance!= null){
        return `
        <tr class="user">
            <td class="user_id">${user.id}</td>
            <td class="user_name">${user.name}</td>
            <td class="user_balance">${user.balance}</td>
            <td><label for="modal-4" onclick="getUserInfo('${user.id}')">Подробнее</label></td>
						<td><label for="modal-2">Одолжить</label></td>
        </tr>
`
    }
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

const renderUserProfile = user =>{
  if(user.name != null && user.balance!= null){
    return `
    <div>
      <label>ID:     </label><label>${user.id}</label><br>
      <label>ФИО:    </label><label>${user.name}</label><br>
      <label>Баланс: </label><label>${user.balance}</label><br>
      <label>Долг:   </label><label>${user.debt}</label><br>
    </div>
    `
}
};

const addUserProfileForm = document.querySelector('#okno');



const addCash = user =>{
  user.balance+= document.getElementById("balance").value;
}
//test
// createRequest({ path: "/api/users", method: "GET" })
//   .then(response => {
//     document.querySelector("#dynamic").innerHTML = response
//       .map(renderUser)
//       .join("");
//     console.log("Результат запроса пользователей", response);
//     window.profileId = response[1].id;
//     console.log(document.querySelector("#modal-user-id"));
//     document.querySelector("#modal-user-id").innerHTML = window.profileId;
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
      console.log("Пользователь добавлен", response);
      //data = response.id;
      console.log("Это то что лежит в дата",response.id);
     // window.profileId = response.id;
      console.log("Это профиль айди",window.profileId);
    })
    .catch(() => {
      toggleClass(".add-user", "loading");
      console.log("Не удалось добавить пользователя");
    });
});

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
///////////////////////////////////////////////////
// function profileonload(userId){
//   $("#profId").value=userId;
//   if (user.id == userId)
//   {
//     $("#profName").value=user.name;
//     $("#profBalance").value=user.balance;
//     $("#profDebt").value=user.debt;
//   }
// }


// const addCashForm = document.querySelector('#add-cash');
// addCashForm.addEventListener("submit", event => {
//   event.preventDefault();
//   const data = getFieldData(event.target);
//   console.log("main", "data", data);
//   const userId = 'b5bffe76-dacc-4b69-aa32-cbea07d75e27';

//   toggleClass(addCashForm, "loading");
//   console.log(userId);
  // createRequest({ path: `/api/users/${userId}`, method: "PATCH" }, {}, data)
  //   .then(response => {
  //     document.querySelector("#add-cash").innerHTML = addCash(response);
  //     toggleClass(".add-cash", "loading");
  //     console.log("Средства пополнены", response);
  //   })
  //   .catch(() => {
  //     document.querySelector("#add-cash").innerHTML = "Невозможно пополнить баланс";
  //     toggleClass(".add-cash", "loading");
  //     console.log("Невозможно пополнить средства");
  //   });
  // })
  // const getOneUserForm = document.querySelector("#get-one-user");
  // getOneUserForm.addEventListener("okno", event => {
  // event.preventDefault();

  // const data = getFieldData(event.target);

  // toggleClass(".one-user", "loading");

  createRequest({ path: "/api/users", method: "GET" })
  .then(response => {
    document.querySelector("#dynamic").innerHTML = response
      .map(renderUser)
      .join("");
    console.log("Результат запроса пользователей", response);
    window.profileId = response[1].id;
    window.profileName = response[1].name;
    window.profileBalance = response[1].balance;
    window.profileDebt = response[1].debt;
    console.log(document.querySelector("#modal-user-id"));
    
    createRequest({ path: `/api/users/${window.profileId}`, method: "GET" })
    .then(response => {
      document.querySelector("#okno").innerHTML = renderUserId(response);
      toggleClass(".okno", "loading");
      console.log("(2)Данные пользователя получены", response);
      console.log("(2)userID это он", window.profileId);
    //   document.querySelector("#modal-user-id").innerHTML = window.profileId;
    // document.querySelector("#modal-user-name").innerHTML = window.profileName;
    // document.querySelector("#modal-user-balance").innerHTML = window.profileBalance;
    // document.querySelector("#modal-user-debt").innerHTML = window.profileDebt;
    })
              
    .catch(() => {
      document.querySelector("#okno").innerHTML =
        "Пользователя с таким id не нашлось :(";
      toggleClass(".okno", "loading");
      console.log("(2)Не найден пользователь с id=", window.profileId);
    }
    );
    
  })
  .catch(err => {
    document.querySelector("#users").innerHTML =
      "Не удалось получить список пользователей";
    console.log("Ошибка при получении списка пользователей", err);
  })

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