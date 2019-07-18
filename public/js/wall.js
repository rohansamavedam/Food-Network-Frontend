
// const url = "http://localhost:3000/tasks?sortBy=-1&limit=10"

const url = "https://samavedam-food-network.herokuapp.com/tasks?sortBy=-1&limit=25&skip=0"

$(document).ready(function(){

    $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json',
        dataType:'json',
        success: function(data){
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $("#taskHolder").append("<div class=\"card mb-3 container\" style=\"max-width: 1000px;\"> <div class=\"row no-gutters\"> <div class=\"col-md-4\"> <img src=\""+data[i].imagelink+"\" class=\"card-img\" alt=\"recipe-image\" style=\"height: 250px; width: 250px\"> </div> <div class=\"col-md-8\"> <div class=\"card-body\"> <h5 class=\"card-title\">"+data[i].name+"</h5> <p class=\"card-text\">"+data[i].description+"</p> <p class=\"card-text\"><small class=\"text-muted\">"+data[i].link+"</small></p> <p class=\"card-text\"><small class=\"text-muted\">Recipe Created by "+data[i].ownerName+" | Cusine: "+data[i].cusine+"</small></p></div> </div> </div></div>");
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
               if (xhr.status == 200) {
                   console.log(ajaxOptions);
               }
               else {
                   alert("authentication required")
                   location.href = "/index";
                   console.log(xhr.status);
                   console.log(thrownError);
               }
           }
     });


})