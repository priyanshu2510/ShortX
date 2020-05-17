let url = "http://34.70.208.23/api/url";

function verify() {
    var thisAlert = $('#url').parent();
    $(thisAlert).removeClass('alert-validate');
    var thisAlert = $('#url').parent();
    $(thisAlert).removeClass('alert-validate1');
    let urll = $('#url').val().trim();
    let custom = $('#cus').val().trim();
    if (urll === "") {
        var thisAlert = $('#url').parent();
        $(thisAlert).addClass('alert-validate');
        return;
    }
    var pattern = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])+(.[a-z])?/;
    var regex = new RegExp(pattern);
    if (!urll.match(regex)) {
        var thisAlert = $('#url').parent();
        $(thisAlert).addClass('alert-validate1');
        return;
    }




    $("#btnSubmit").attr("disabled", true);
    $('.rotator').addClass('spinner');
    $.ajax({
        url: url + "/create",
        method: "POST",

        data: {
            url: urll,
            custom: custom



        },

        crossDomain: true,
        success: function (res) {
            console.log(res.status);
            $('.rotator').removeClass('spinner');
            if (res.status !== 200) {
                $("#btnSubmit").attr("disabled", false);
                $("#errMsg").css({
                    "color": "red"
                });
                $("#errMsg").text(res.message);
            } else if (res.status === 200) {
                $("#errMsg").css({
                    "color": "green"
                });
                $("#errMsg").text(res.message);
                $("#btnSubmit").attr("disabled", false);

            }
        },
        error: function (err) {
            $("#btnSubmit").attr("disabled", false);
            $("#errMsg").text(err);
        }
    });

}