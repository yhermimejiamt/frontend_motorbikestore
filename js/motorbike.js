function categoryBox(){
    console.log("se esta ejecutando")
    $.ajax({
        //url: "http://localhost:8080/api/Category/all",
        url:"http://152.67.33.106:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }    
    })
}
//Manejador GET
function getMotorbike() {
    $.ajax({
        //url: "http://localhost:8080/api/Motorbike/all",
        url:"http://152.67.33.106:8080/api/Motorbike/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            boardMotorbike(response);
        }
    });
}

function boardMotorbike(response){
    let myTable="<table>"
    for(i=0;i<response.length;i++){
        myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].brand + "</td>";
        myTable+="<td>" + response[i].year + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+="<td><button onclick='editClient("+response[i].id+")'>Actualizar</button>";
        myTable+="<td><button onclick='deleteClient("+response[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#motorbike").html(myTable);
}
//Capturar informacion para Actualizar
function editMotorbike(id) {
    $.ajax({
        dataType: 'json',
        //url: "http://localhost:8080/api/Motorbike/" + id,
        url:"http://152.67.33.106:8080/api/Motorbike/"+id,        
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#idMotorbike").val(item.id);
            $("#nameMotorbike").val(item.name);
            $("#brandMotorbike").val(item.brand);
            $("#yearMotorbike").val(item.year);
            $("#descriptionMotorbike").val(item.description);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function postMotorbike() {

    if($("#nameMotorbike").val().length == 0 || $("#brandMotorbike").val().length == 0 || $("#yearMotorbike").val().length == 0 || $("#descriptionMotorbike").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#nameMotorbike").val(),
                brand: $("#brandMotorbike").val(),
                year: $("#yearMotorbike").val(),
                description: $("#descriptionMotorbike").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                //url: "http://localhost:8080/api/Motorbike/save",
                url:"http://152.67.33.106:8080/api/Motorbike/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#nameMotorbike").val("");
                    $("#brandMotorbike").val("");
                    $("#yearMotorbike").val("");
                    $("#descriptionMotorbike").val("");
                    
                    getMotorbike();

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}
//Manejador DELETE
function deleteMotorbike(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
    console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
        //url: "http://localhost:8080/api/Motorbike/" + idElemento,
        url:"http://152.67.33.106:8080/api/Motorbike/"+idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaSkate").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function putMotorbike(idElemento) {
    
    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#name2").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#description2").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://168.138.247.22:80/api/Skate/update",
            //url: "http://localhost:8080/api/Skate/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaSkate").empty();
                listarSkate();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado2").empty();
                $("#id").val("");
                $("#name2").val("");
                $("#brand").val("");
                $("#year").val("");
                $("#description2").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}