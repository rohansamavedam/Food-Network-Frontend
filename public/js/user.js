// const url = "http://localhost:3000/tasks"
// const userUrl = "http://localhost:3000/users/logout"
const url = "https://samavedam-food-network.herokuapp.com/tasks"
const userUrl = "https://samavedam-food-network.herokuapp.com/users/logout"
var tasks = []

const token = localStorage.getItem("token")
const name = localStorage.getItem("name")
console.log(token)
console.log(name)

$(document).ready(function(){
    if(token===null || token===undefined){
        alert("please authenticate")
        $("#taskbox").hide()
    }else{
        const welcomeMsg = "Hey there " + name + " ! Welcome"
        $("#user").text(welcomeMsg);
        $.ajax({
            url: url+"/me",
            type: 'GET',
            contentType: 'application/json',
            dataType:'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+token);
            },
            success: function(data){
                console.log(data);
                tasks = data
                for (var i = 0; i < data.length; i++) {
                    $("#taskholder").append("<div class=\"card mb-3 container\" style=\"max-width: 1000px;\"> <div class=\"row no-gutters\"> <div class=\"col-md-4\"> <img src=\""+data[i].imagelink+"\" class=\"card-img\" alt=\"recipe-image\" style=\"height: 250px; width: 250px\"> </div> <div class=\"col-md-8\"> <div class=\"card-body\"> <h5 class=\"card-title\">"+data[i].name+"</h5> <p class=\"card-text\">"+data[i].description+"</p> <p class=\"card-text\"><small class=\"text-muted\">"+data[i].link+"</small></p> </div> </div> </div></div>");
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

        $("#create").click(function(){
            const itemname = $("#name").val();
            const description = $("#description").val();
            const link = $("#link").val();
            const imageLink = $("#imageLink").val();
            const cusine = $("#cusine").val(); 
            const recipe = {
                'name': itemname,
                'description': description,
                'link': link,
                'imagelink': imageLink,
                'cusine': cusine,
            }

            console.log(recipe)

            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(recipe),
                dataType:'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer '+token);
                },
                success: function(data){
                    console.log(data);
                    location.reload();
                     },
                  error: function(xhr, ajaxOptions, thrownError) {
                       if (xhr.status == 200) {
                           console.log(ajaxOptions);
                       }
                       else {
                           console.log(xhr.status);
                           console.log(thrownError);
                       }
                   }
             });
        })

    }

    $("#del").click(function(){

        const delVal = $("#delVal").val()
        const startLength = tasks.length
        
        tasks.forEach((task, index) => {
            if(task.name === delVal){
                $.ajax({
                    url: url+"/"+task._id,
                    type: 'DELETE',
                    contentType: 'application/json',
                    dataType:'json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer '+token);
                    },
                    success: function(data){
                        location.reload();
                         },
                      error: function(xhr, ajaxOptions, thrownError) {
                           if (xhr.status == 200) {
                               console.log(ajaxOptions);
                           }
                           else {
                               console.log(xhr.status);
                               console.log(thrownError);
                           }
                       }
                 });

                 tasks.splice(index, 1)
                 
            }
        })
        if(tasks.length===startLength){
            alert("enter correct name as it is")
        }



    })

    $("#logout").click(function(){
        $.ajax({
            url: userUrl,
            type: 'POST',
            contentType: 'application/json',
            dataType:'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer '+token);
            },
            success: function(data){
                location.href = "/index";
                 },
            error: function(xhr, ajaxOptions, thrownError) {
                if (xhr.status == 200) {
                    console.log(ajaxOptions);
                    location.href = "/index";
                }
                else {
                    console.log(xhr.status);
                    console.log(thrownError);
                    location.href = "/index";
                }
            }
         });
    })


});