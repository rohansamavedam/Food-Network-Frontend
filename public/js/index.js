// const url = "http://localhost:3000/users";
const url = "https://samavedam-food-network.herokuapp.com/users"

const validateEntry = () => {
    var isValid = true;
    if($('#name').val()==='' || $('#email').val()==='' || $('#pass').val()===''){
      isValid = false;
    }
    return isValid;
}

const validateEntryLogin = () => {
    var isValid = true;
    if($('#loginemail').val()==='' || $('#loginpass').val()===''){
      isValid = false;
    }
    return isValid;
}

$(document).ready(function(){
    $("#loginload").hide()
    $("#signupload").hide()
    $("#signup").click(function(){
        if(!validateEntry()){
            alert('please fill in signup credentials')
        }else{
            const name = $("#name").val();
            const email = $("#email").val();
            const password = $("#pass").val();
            const user = {
                'name': name,
                'email': email,
                'password': password
            }
            $("#loginload").show()
            $("#signupload").show()
            console.log(user)
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(user),
                dataType:'json',
                success: function(data){
                    console.log(data);
                    localStorage.setItem("token",data.token);
                    localStorage.setItem("name",data.user.name);
                    location.href = "/user";
                     },
                  error: function(xhr, ajaxOptions, thrownError) {
                    $("#loginload").text('Invalid Credentials')
                    $("#signupload").text('Invalid Credentials, Check Email, Password must have 7 char or more')
                       if (xhr.status == 200) {
                           console.log(ajaxOptions);
                       }
                       else {
                           console.log(xhr.status);
                           console.log(thrownError);
                       }
                   }
             });
        }
      });

      $("#login").click(function(){
            if(!validateEntryLogin()){
                alert('please fill in login credentials')
            }else{
                const loginemail = $("#loginemail").val()
                const loginpass = $("#loginpass").val()
                const userCred = {
                    'email': loginemail,
                    'password': loginpass
                }
                $("#loginload").show()
                $("#signupload").show()
                $.ajax({
                    url: url+"/login",
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(userCred),
                    dataType:'json',
                    success: function(data){
                        console.log(data);
                        localStorage.setItem("token",data.token);
                        localStorage.setItem("name",data.user.name);
                        location.href = "/user";
                         },
                      error: function(xhr, ajaxOptions, thrownError) {
                        $("#loginload").text('Invalid Credentials')
                        $("#signupload").text('Invalid Credentials, Check Email, Password must have 7 char or more')
                           if (xhr.status == 200) {
                               console.log(ajaxOptions);
                           }
                           else {
                               console.log(xhr.status);
                               console.log(thrownError);
                           }
                       }
                 });

            }
      })

  });


