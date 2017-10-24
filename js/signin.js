$(function(){
    $(".log-btn").click(function(){
        var user=$("#UserName").val();
        var passWord=$("#Passwod").val();
        if(user=="1"&&passWord=="1"){
            alert("登录成功！");
            window.location.href = "index.html";
        }
    })
});