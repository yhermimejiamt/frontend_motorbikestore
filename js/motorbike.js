function categoryBox() {
  //console.log("carga categoria");
  $.ajax({
    //url:"http://localhost:8080/api/Category/all",
    url:"http://152.67.33.106:8080/api/Category/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      let $select = $("#select-category");
      $.each(respuesta, function (id, name) {
        $select.append(
          "<option value=" + id.name + ">" + name.name + "</option>"
        );
        console.log(name.name);
      });
    },
  });
}
getMotorbike();
//Manejador GET
function getMotorbike() {
  $.ajax({
    //url:"http://localhost:8080/api/Motorbike/all",
    url:"http://152.67.33.106:8080/api/Motorbike/all",
    type: "GET",
    datatype: "JSON",
    success: function (response) {
      console.log(response);
      boardMotorbike(response);
    },
  });
}
function boardMotorbike(response) {
  let myTable = "<table>";
  for (i = 0; i < response.length; i++) {
    myTable += "<tr>";
    myTable += "<td>" + response[i].id + "</td>";    
    myTable += "<td>" + response[i].brand + "</td>";
    myTable += "<td>" + response[i].year + "</td>";
    myTable += "<td>" + response[i].category + "</td>";
    myTable += "<td>" + response[i].name + "</td>";    
    myTable += "<td>" + response[i].description + "</td>";    
    myTable += "<td><button onclick='editMotorbike(" +response[i].id + ")'>Update</button>";
    myTable += "<td><button onclick='deleteMotorbike(" + response[i].id + ")'>Delete</button>";
    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#motorbike").html(myTable);
}
//Capturar informacion para Actualizar
function editMotorbike(id) {
  $.ajax({
    dataType: "json",
    //url:"http://localhost:8080/api/Motorbike/" + id,
    url: "http://152.67.33.106:8080/api/Motorbike/" + id,
    type: "GET",

    success: function (response) {
      console.log(response);
      var item = response;

      $("#idMotorbike").val(item.id);
      $("#nameMotorbike").val(item.name);
      $("#brandMotorbike").val(item.brand);
      $("#yearMotorbike").val(item.year);
      $("#descriptionMotorbike").val(item.description);
    },
    error: function (jqXHR, textStatus, errorThrown) {},
  });
}
function postMotorbike() {
    if (
      $("#brandMotorbike").val().length == 0 ||
      $("#yearMotorbike").val().length == 0 ||
      $("#nameMotorbike").val().length == 0 ||
      $("#descriptionMotorbike").val().length == 0
    ) {
      alert("Todos los campos son obligatorios");
    } else {
      let varMotorbike = {
        brand: $("#brandMotorbike").val(),
        year: $("#yearMotorbike").val(),
        //category:{id: +$("#select-category").val()},
        name: $("#nameMotorbike").val(),
        description: $("#descriptionMotorbike").val(),
      };
      console.log(varMotorbike);
      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: JSON.stringify(varMotorbike),
        //url:"http://localhost:8080/api/Motorbike/save",
        url:"http://152.67.33.106:8080/api/Motorbike/save",
        success: function (response) {
          console.log(response);
          alert("Motorbike creado correctamente");
          window.location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          window.location.reload();
          alert("No se creo el motorbike");
        },
      });
    }
}
//Manejador PUT
function putMotorbike(idElemento) {
  if (
    $("#nameMotorbike").val().length == 0 ||
    $("#brandMotorbike").val().length == 0 ||
    $("#yearMotorbike").val().length == 0 ||
    $("#descriptionMotorbike").val().length == 0
  ) {
    alert("Todos los campos deben estar llenos");
  } else {
    let elemento = {
      id: $("#idMotorbike").val(),
      name: $("#nameMotorbike").val(),
      brand: $("#brandMotorbike").val(),
      year: $("#yearMotorbike").val(),
      description: $("#descriptionMotorbike").val(),
      //category: { id: +$("#select-category").val() },
    };

    console.log(elemento);
    let dataToSend = JSON.stringify(elemento);

    $.ajax({
      datatype: "json",
      data: dataToSend,
      contentType: "application/JSON",
      //url:"http://localhost:8080/api/Motorbike/update",
      url:"http://152.67.33.106:8080/api/Motorbike/update",
      type: "PUT",
      success: function (response) {
        console.log(response);
        getMotorbike();
        alert("Motorbike Actualizada Correctamente!");

        //Limpiar Campos
        $("#resultado2").empty();
        $("#idMotorbike").val("");
        $("#nameMotorbike").val("");
        $("#brandMotorbike").val("");
        $("#yearMotorbike").val("");
        $("#descriptionMotorbike").val("");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        alert("No se Actualizo Correctamente!");
      },
    });
  }
}
function deleteMotorbike(idMotorbike){
    let myData={
        idMotorbike:idMotorbike
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        //url:"http://localhost:8080/api/Motorbike/" + idMotorbike,
        url:"http://152.67.33.106:8080/api/Motorbike/"+idMotorbike,
        
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            getMotorbike();
            alert("La Motorbike ha sido eliminada.")
        }
    });
}