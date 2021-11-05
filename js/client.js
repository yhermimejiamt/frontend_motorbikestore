//----- Script modulo Cliente -----//

function postClient() {
  if (
    $("#emailClient").val().length == 0 ||
    $("#passwordClient").val().length == 0 ||
    $("#nameClient").val().length == 0 ||
    $("#ageClient").val().length == 0
  ) {
    alert("Todos los campos son obligatorios");
  } else {
    let varClient = {
      email: $("#emailClient").val(),
      password: $("#passwordClient").val(),
      name: $("#nameClient").val(),
      age: $("#ageClient").val(),
    };
    console.log(varClient);
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "JSON",
      data: JSON.stringify(varClient),
      //url:"http://localhost:8080/api/Client/save",
      url:"http://152.67.33.106:8080/api/Client/save",
      success: function (response) {
        console.log(response);
        alert("Cliente creado correctamente");
        window.location.reload();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        window.location.reload();
        alert("No se creo el cliente");
      },
    });
  }
}
getClient();
function getClient() {
  $.ajax({
    //url:"http://localhost:8080/api/Client/all",
    url:"http://152.67.33.106:8080/api/Client/all",
    type: "GET",
    datatype: "JSON",
    success: function (resultClient) {
    console.log(resultClient);
    boardClient(resultClient);
    },
  });
}
function boardClient(resultClient) {
  let tableClient = "<table>";
  for (i = 0; i < resultClient.length; i++) {
    tableClient += "<tr>";
    tableClient += "<td>" + resultClient[i].idClient + "</td>";
    tableClient += "<td>" + resultClient[i].email + "</td>";
    tableClient += "<td>" + resultClient[i].password + "</td>";
    tableClient += "<td>" + resultClient[i].name + "</td>";
    tableClient += "<td>" + resultClient[i].age + "</td>";
    tableClient += "<td><button onclick='editClient(" + resultClient[i].idClient + ")'>Actualizar</button>";
    tableClient += "<td><button onclick='deleteClient(" + resultClient[i].idClient + ")'>Borrar</button>";
    tableClient += "</tr>";
  }
  tableClient += "</table>";
  $("#client").html(tableClient);
}
function editClient(idClient) {
  $.ajax({
    dataType: "json",
    //url:"http://localhost:8080/api/Client/" + idClient,
    url:"http://152.67.33.106:8080/api/Client/"+idClient,
    type: "GET",
    success: function (response) {
    console.log(response);
    var item = response;
    $("#idClient").val(item.idClient);
    console.log(item.idClient);
    $("#emailClient").val(item.email);
    $("#passwordClient").val(item.password);
    $("#nameClient").val(item.name);
    $("#ageClient").val(item.age);
    },
    error: function (jqXHR, textStatus, errorThrown) {},
  });
}
function putClient(idClient) {
  if (
    $("#emailClient").val().length == 0 ||
    $("#passwordClient").val().length == 0 ||
    $("#nameClient").val().length == 0 ||
    $("#ageClient").val().length == 0
  ) {
    alert("Todos los campos son obligatorios");
  } else {
    let myData = {
      idClient: $("#idClient").val(),
      email: $("#emailClient").val(),
      password: $("#passwordClient").val(),
      name: $("#nameClient").val(),
      age: $("#ageClient").val(),
    };
    console.log(myData.idClient);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      //url:"http://localhost:8080/api/Client/update",
      url:"http://152.67.33.106:8080/api/Client/update",
      type: "PUT",
      data: dataToSend,
      contentType: "application/JSON",
      datatype: "JSON",
      success: function (respuesta) {
        $("#respuesta").empty();
        $("#idClient").val(""),
        $("#emailClient").val(""),
        $("#passwordClient").val(""),
        $("#nameClient").val(""),
        $("#ageClient").val(""),
        getClient();
        alert("El cliente se ha actualizado correctamente");
      },
    });
  }
}
function deleteClient(idClient) {
  let myData = {
    id: idClient,
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    //url:"http://localhost:8080/api/Client/" + idClient,
    url:"http://152.67.33.106:8080/api/Client/"+idClient,
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (response) {
    $("#resultado").empty();
    getClient();
    alert("El cliente ha sido eliminado..");
    },
  });
}
