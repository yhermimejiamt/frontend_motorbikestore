function clientBox() {
  console.log("activo el box de cliente");
  $.ajax({
    //url:"http://localhost:8080/api/Client/all",
    url:"http://152.67.33.106:8080/api/Client/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      let $select = $("#select-client");
      $.each(respuesta, function (id, name) {
        $select.append(
          "<option value=" + name.idClient + ">" + name.name + "</option>"
        );
      });
    },
  });
}
function motorbikeBox() {
  console.log("activo el box de motorbike");
  $.ajax({
    //url:"http://localhost:8080/api/Motorbike/all",
    url:"http://152.67.33.106:8080/api/Motorbike/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      let $select = $("#select-motorbike");
      $.each(respuesta, function (id, name) {
        $select.append(
          "<option value=" + name.id + ">" + name.name + "</option>"
        );
      });
    },
  });
}
getReservation();
//Manejador "POST"
function postReservation() {
  if (
    $("#startDate").val().length == 0 ||
    $("#devolutionDate").val().length == 0 ||
    $("#status").val().length == 0
  ) {
    alert("Todos los campos son Obligatorios");
  } else {
    let elemento = {
      idReservation: $("#idReservation").val(),
      startDate: $("#startDate").val(),
      devolutionDate: $("#devolutionDate").val(),
      status: $("#status").val(),
      motorbike: { id: +$("#select-motorbike").val() },
      client: { idClient: +$("#select-client").val() },
    };

    let dataToSend = JSON.stringify(elemento);
    $.ajax({
      type: "POST",
      contentType: "application/json",
      //url:"http://localhost:8080/api/Reservation/save",
      url: "http://152.67.33.106:8080/api/Reservation/save",
      data: dataToSend,
      datatype: "json",
      success: function (response) {
        console.log(response);
        //Limpiar Campos
        $("#resultado5").empty();
        $("#startDate").val("");
        $("#devolutionDate").val("");
        $("#status").val("");

        alert("Se ha guardado Correctamente!");
        getReservation();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("No se guardo Correctamente!");
      },
    });
  }
}
function getReservation() {
  $.ajax({
    //url:"http://localhost:8080/api/Reservation/all",
    url: "http://152.67.33.106:8080/api/Reservation/all",
    type: "GET",
    datatype: "JSON",
    success: function (response) {
      console.log(response);
      boardReservation(response);
    },
  });
}
function boardReservation(response) {
  let myTable = "<table>";

  for (i = 0; i < response.length; i++) {
    myTable += "<tr>";
    myTable += "<td>" + response[i].idReservation + "</td>";
    myTable += "<td>" + response[i].startDate + "</td>";
    myTable += "<td>" + response[i].devolutionDate + "</td>";
    myTable += "<td>" + response[i].status + "</td>";
    myTable += "<td>" + response[i].client.name + "</td>";
    myTable += "<td>" + response[i].motorbike.name + "</td>";
    myTable += "<td><button onclick='editReservation(" + response[i].idReservation + ")'>Update</button>";
    myTable += "<td><button onclick='deleteReservation(" + response[i].idReservation + ")'>Delete</button>";
    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#reservation").html(myTable);
}
//Capturar informacion para Actualizar
function editReservation(idReservation) {
  $.ajax({
    dataType: "json",
    //url:"http://localhost:8080/api/Reservation/" + idReservation,
    url:"http://152.67.33.106:8080/api/Reservation/" + idReservation,
    type: "GET",
    success: function (response) {
      console.log(response);
      var item = response;
      $("#idReservation").val(item.idReservation);
      $("#status").val(item.status);
    },
    error: function (jqXHR, textStatus, errorThrown) {},
  });
}
//Manejador PUT
function putReservation(idElemento) {
  let elemento = {
    idReservation: $("#idReservation").val(),
    startDate: $("#startDate").val(),
    devolutionDate: $("#devolutionDate").val(),
    status: $("#status").val(),
    motorbike: { id: +$("#select-motorbike").val() },
    client: { idClient: +$("#select-client").val() },
  };
  let dataToSend = JSON.stringify(elemento);
  $.ajax({
    datatype: "json",
    data: dataToSend,
    contentType: "application/JSON",
    //url:"http://localhost:8080/api/Reservation/update",
    url:"http://152.67.33.106:8080/api/Reservation/update",
    type: "PUT",
    success: function (response) {
      console.log(response);
      $("#miListaReservation").empty();
      alert("se ha Actualizado Correctamente!");
      //Limpiar Campos
      $("#resultado5").empty();
      $("#idReservation").val("");
      $("#startDate").val("");
      $("#devolutionDate").val("");
      $("#status").val("");
      getReservation();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("No se Actualizo Correctamente!");
    },
  });
}
//Manejador DELETE
function deleteReservation(idElemento) {
  let elemento = {
    id: idElemento,
  };
  let dataToSend = JSON.stringify(elemento);
  $.ajax({
    dataType: "json",
    data: dataToSend,
    //url:"http://localhost:8080/api/Reservation/" + idElemento,
    url:"http://localhost:8080/api/Reservation/" + idElemento,
    type: "DELETE",
    contentType: "application/JSON",
    success: function (response) {
      console.log(response);
      $("#miListaReservation").empty();
      alert("se ha Eliminado Correctamente!");
      getReservation();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("No se Elimino Correctamente!");
    },
  });
}
