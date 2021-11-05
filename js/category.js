//----- Script modulo Categoria -----//

function postCategory() {
  if (
    $("#nameCategory").val().length == 0 ||
    $("#descriptionCategory").val().length == 0
  ) {
    alert("Todos los campos son obligatorios");
  } else {
    let varCategory = {
      name: $("#nameCategory").val(),
      description: $("#descriptionCategory").val(),
    };
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "JSON",
      data: JSON.stringify(varCategory),
      //url: "http://localhost:8080/api/Category/save",
      url:"http://152.67.33.106:8080/api/Category/save",
      success: function (response) {
        console.log(response);
        alert("Se guardo correctamente");
        window.location.reload();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        window.location.reload();
        alert("No se guardo correctamente");
      },
    });
  }
}

getCategory();

function getCategory() {
  $.ajax({
    //url: "http://localhost:8080/api/Category/all",
    url:"http://152.67.33.106:8080/api/Category/all",
    type: "GET",
    datatype: "JSON",
    success: function (resultCategory) {
      console.log(resultCategory);
      boardCategory(resultCategory);
    },
  });
}
function boardCategory(resultCategory) {
  let tableCategory = "<table>";
  for (i = 0; i < resultCategory.length; i++) {
    tableCategory += "<tr>";
    tableCategory += "<td>" + resultCategory[i].id + "</td>";
    tableCategory += "<td>" + resultCategory[i].name + "</td>";
    tableCategory += "<td>" + resultCategory[i].description + "</td>";
    tableCategory += "<td><button onclick='editCategory("+ resultCategory[i].id +")'>Actualizar</button>";
    tableCategory +="<td><button onclick='deleteCategory("+ resultCategory[i].id +")'>Borrar</button>";
    tableCategory += "</tr>";
  }
  tableCategory += "</table>";
  $("#category").html(tableCategory);
}
function editCategory(idCategory) {
    $.ajax({
      dataType: "json",
      //url: "http://localhost:8080/api/Category/" + idCategory,
      url:"http://152.67.33.106:8080/api/Category/"+idCategory,
      type: "GET",
  
      success: function (response) {
        console.log(response);
        var item = response;
        $("#idCategory").val(item.id);
        console.log(item.id);
        $("#nameCategory").val(item.name);
        $("#descriptionCategory").val(item.description);
      },
  
      error: function (jqXHR, textStatus, errorThrown) {},
    });
  }
function putCategory(idCategory){
    
    if ($("#nameCategory").val().length==0 || $("#descriptionCategory").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{    
    
    let myData={
        id:$("#idCategory").val(),
        name:$("#nameCategory").val(),
        description:$("#descriptionCategory").val(),

    };
    console.log(myData.id);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url: "http://localhost:8080/api/Category/update",
        url:"http://152.67.33.106:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#nameCategory").val("");
            $("#descriptionCategory").val("");
            getCategory();
            alert("se ha Actualizado correctamente la categoria")
        }
    });}

}

function deleteCategory(idCategory) {
  let myData = {
    id: idCategory,
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    //url: "http://localhost:8080/api/Category/" + idCategory,
    url:"http://152.67.33.106:8080/api/Category/"+idCategory,
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (response) {
      $("#resultado").empty();
      getCategory();
      alert("Se ha Eliminado.");
    },
  });
}
