let statusLogin = false;
$(document).ready(function () {
    $("#login").click(function () {
        console.log("clicked")
        statusLogin = true;
        if (!statusLogin) {
            $("#page1").show();
            $(".todo").hide();
        } else {
            $("#page1").hide();
            $(".todo").show();
        }
    })
    $("#register").click(function () {
        console.log("clicked")
        statusLogin = true;
        if (!statusLogin) {
            $("#page1").show();
            $(".todo").hide();
        } else {
            $("#page1").hide();
            $(".todo").show();
        }
    })
    $("#logout").click(function () {
        console.log("clicked")
        statusLogin = false;
        if (!statusLogin) {
            $("#page1").show();
            $(".todo").hide();
        } else {
            $("#page1").hide();
            $(".todo").show();
        }
    })

    $(".todo").hide();
})
// let statusLogin = false;

// $("#login").click(function () {
//     console.log("clicked")
//     statusLogin = true;
// })

// if (!statusLogin) {
//     $("#page1").show();
//     $("#todo").hide();
// } else {
//     $("#page1").hide();
//     $("#todo").show();
// }