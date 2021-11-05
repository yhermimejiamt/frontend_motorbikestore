function clientBox(){
    console.log("activo el box de cliente");
    $.ajax({
        //url:"http://localhost:8080/api/Client/all",
        url:"http://152.67.33.106:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){          
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');            
            }); 
        }    
    })
}
function motorbikeBox(){
    console.log("activo el box de motorbike");
    $.ajax({
        //url:"http://localhost:8080/api/Motorbike/all",
        url:"http://152.67.33.106:8080/api/Motorbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){        
            let $select = $("#select-motorbike");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');         
            }); 
        }    
    })
}
function postMessage(){
    console.log("inicia el post");
    if ($("#messageText").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    let varMessage = {        
        messageText:$("#messageText").val(),        
        client:{idClient: +$("#select-client").val()},  
        motorbike:{id: +$("#select-motorbike").val()},  
        };       
        console.log(varMessage);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(varMessage),
        //url:"http://localhost:8080/api/Message/save",
        url:"http://152.67.33.106:8080/api/Message/save",                
        success:function(response) {
            console.log(response);
            alert("Mensaje creado correctamente");
            window.location.reload()    
        },        
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("El mensaje no se guardo");    
        }
        });
    }
}
getMessage();
function getMessage(){
    console.log("Inicia el GET")
    $.ajax({
        //url:"http://localhost:8080/api/Message/all",
        url:"http://152.67.33.106:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            boardMessage(respuesta);
        }    
    })
}
function boardMessage(respuesta){
 
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idMessage+"</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].motorbike.name+"</td>";
        myTable += "<td><button onclick='editMessage("+ respuesta[i].idMessage +")'>Actualizar</button>";
        myTable +="<td><button onclick='deleteMessage("+ respuesta[i].idMessage +")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#message").html(myTable);
}
function editMessage(idMessage) {
    console.log(idMessage);
    $.ajax({
      dataType: "json",
      //url:"http://localhost:8080/api/Message/" + idMessage,
      url:"http://152.67.33.106:8080/api/Message/"+idMessage,
      type: "GET",  
      success: function (response) {
        console.log(response);
        var item = response;
        $("#idMessage").val(item.idMessage);
        console.log(item.idMessage);
        $("#messageText").val(item.messageText);
      },  
      error: function (jqXHR, textStatus, errorThrown) {},
    });
}
function putMessage(idMessage){    
    if ($("#messageText").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{        
    let myData={
        idMessage:$("#idMessage").val(),
        messageText:$("#messageText").val(), 
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        //url:"http://localhost:8080/api/Message/update",
        url:"http://152.67.33.106:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idMessage").val("");
            $("#messageText").val("");
            getMessage();
            alert("Mensaje actualizado correctamente ")
        }
    });}
}
function deleteMessage(idMessage){
    let myData={
        idMessage:idMessage
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        //url:"http://localhost:8080/api/Message/" + idMessage,
        url:"http://152.67.33.106:8080/api/Message/"+idMessage,

        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            getMessage();
            alert("El Mensaje ha sido eliminado.")
        }
    });
}