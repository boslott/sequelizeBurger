$(document).ready(function() {

  let nameInput = $('#burgerName');
  let undevBurgerList = $('.js-undevoured');
  let devBurgerList = $('.js-devoured');
  let undevBurgerContainer = $('.undevoured-burgers-container');
  let devBurgerContainer = $('.devoured-burgers-container');

  //  Handles fornm submission to create new burger
  function handleNewBurger(event) {
    if (!nameInput.val().trim().trim()) {
      return;
    }
    createNewBurger({
      name: nameInput.val().trim()
    });
  }

  function handleDevour(event) {
    let id = $(this).data('id');

    $.ajax('/api/burgers/' + id, {
      type: 'PUT'
    }).then(() => {
      getBurgers();
    });
  }

  function createNewBurger(burgerData) {

    $.ajax('/api/burgers', {
      type: 'POST',
      data: burgerData
    }).then(getBurgers);
  };

  //  Create a list row for undevoured burgers
  function createUndevBurgerRow(burgerData) {
    let newTr = $('<tr>');
    newTr.data('burger', burgerData);
    newTr.append('<td>' + burgerData.name + '</td>');
    newTr.append('<td><input type="text" id="customerName" name="custName" placeholder="Customer?" /></td>');
    newTr.append('<td><button class="btn btn-primary devourBtn" type="button" data-id="' + burgerData.id + '">Devour</button></td>');
    return newTr;
  }

  //  Create a list row for devoured burgers
  function createDevBurgerRow(burgerData) {
    let newTr = $('<tr>');
    newTr.data('burger', burgerData);
    newTr.append('<td>' + burgerData.name + '</td>');
    newTr.append('<td>' + burgerData.custName + '</td>');
    newTr.append('<td><button class="btn btn-primary deleteBtn" type="button">Delete</button></td>');
    return newTr;
  }

  //  Retrieve burgers to be rendered on the page
  function getBurgers() {
    $.ajax('/api/burgers', {
      type: 'GET'
    }).then(result => {
      let undevRowsToAdd = [];
      let devRowsToAdd = [];
      let i = 0;
      for (i; i<result.length; i++) {
        if(!result[i].devoured) {
          undevRowsToAdd.push(createUndevBurgerRow(result[i]));
        } else {
          devRowsToAdd.push(createDevBurgerRow(result[i]));
        }
      }
      renderUndevBurgerList(undevRowsToAdd);
      renderDevBurgerList(devRowsToAdd);
      nameInput.val('');
    });
  }

  //  Render undevoured burger list to the page
  function renderUndevBurgerList(rows) {
    undevBurgerList.children().not().remove();
    if(rows.length) {
      undevBurgerList.prepend(rows);
    }
  }

  //  Render devoured list of burgers to the page
  function renderDevBurgerList(rows) {
    devBurgerList.children().not().remove();
    if(rows.length) {
      devBurgerList.prepend(rows);
    }
  }

  function handleDelete() {
    let listItemData = $(this).parent('td').parent('tr').data('burger');
    let id = listItemData.id;

    $.ajax({
      method: "DELETE",
      url: "/api/burgers/" + id
    })
    .done(getBurgers);
  }

  //  Add event listeners to the buttons to create, devour, or delete
  $('#addBtn').on('click', handleNewBurger);
  $(document).on('click', '.devourBtn', handleDevour);
  $(document).on('click', '.deleteBtn', handleDelete);

  //  Get the initial list of burgers
  getBurgers();


});
