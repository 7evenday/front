const renderUser = user =>{
    if(user.name != null && user.balance!= null){
        return `
        <tr class="user">
            <td class="user_id"  for="modal-1">${user.id}</td>
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
        <label>ФИО:    </label><label>${user.name}</label><br>
        <label>Баланс: </label><label>${user.balance}</label><br>
        <label>Долг:   </label><label>${user.debt}</label><br>
      </div>
      
`
  }
};
//test
createRequest({ path: "/api/users", method: "GET" })
  .then(response => {
    document.querySelector("#dynamic").innerHTML = response
      .map(renderUser)
      .join("");
    console.log("Результат запроса пользователей", response);
  })
  .catch(err => {
    document.querySelector("#users").innerHTML =
      "Не удалось получить список пользователей";
    console.log("Ошибка при получении списка пользователей", err);
  });



const addUserForm = document.querySelector("#add-user");
addUserForm.addEventListener("submit", event => {
  event.preventDefault();
  const data = getFieldData(event.target);
  console.log("main", "data", data);

  toggleClass(".add-user", "loading");

  createRequest({ path: `/api/users`, method: "POST" }, {}, data)
    .then(response => {
      toggleClass(".add-user", "loading");
      console.log("Пользователь добавлен", response);
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
      document.querySelector("#one-user").innerHTML = renderUserId(response);
      toggleClass(".one-user", "loading");
      console.log("Данные пользователя получены", response);
    })
    .catch(() => {
      document.querySelector("#one-user").innerHTML =
        "Пользователя с таким id не нашлось :(";
      toggleClass(".one-user", "loading");
      console.log("Не найден пользователь с id=", data.userId);
    });
}

function addBalance(userId)
  console.log(userId);
  createRequest({ path: `/api/users/${userId}`, method: "PATCH" })
    .then(response => {
      document.querySelector("")
    })

//   const getOneUserForm = document.querySelector("#get-one-user");
//   getOneUserForm.addEventListener("userProfile", event => {
//   event.preventDefault();

//   const data = getFieldData(event.target);

//   toggleClass(".one-user", "loading");

//   createRequest({ path: `/api/users/${data.userId}`, method: "GET" })
//     .then(response => {
//       document.querySelector("#one-user").innerHTML = renderUser(response);
//       toggleClass(".one-user", "loading");
//       console.log("Данные пользователя получены", response);
//     })
//     .catch(() => {
//       document.querySelector("#one-user").innerHTML =
//         "Пользователя с таким id не нашлось :(";
//       toggleClass(".one-user", "loading");
//       console.log("Не найден пользователь с id=", data.userId);
//     });
// });