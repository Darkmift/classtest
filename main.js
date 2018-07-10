var cl = console.log;
cl('online');
var storedUsers = localStorage.getItem("storedUsers") != null ? JSON.parse(localStorage.getItem("storedUsers")) : [];
cl(storedUsers);
$.ajax({
    url: 'https://randomuser.me/api/?results=10',
    dataType: 'json',
})
    .then((user) => {
        cl('onload', user.results);
        user.results.forEach(element => {
            storedUsers.push(element);
            userMaker(element);
        }),
            localStorage.setItem("storedUsers", JSON.stringify(storedUsers));
    })

$('#userspawner').click(function (e) {
    e.preventDefault();
    cl('clicked');
    $.get("user.html", (html) => { })
        .then((html) => {
            $.ajax({
                url: 'https://randomuser.me/api/',
                dataType: 'json',
            })
                .then((user) => {
                    userMaker(user.results[0]);
                })
        })
});

function userMaker(user) {
    //cl(user.results[0]);
    $('#nousersMsg').remove();
    // html.replace("{{image}}", "test.jpg");
    // html.replace("{{userID}}", "loginstuff");
    // cl(html);
    // $('#userList').append(html)
    var userInfo = user;
    var container = $('<div>', {
        class: 'userContainer',
        id: userInfo.login.uuid,
    });

    var userImg = $('<img>', {
        src: userInfo.picture.large,
        alt: userInfo.name.last
    })
    var pGender = $('<p>', {
        html: 'gender: ' + "<span>" + userInfo.gender + "</span>"
    })
    var pName = $('<p>', {
        html: 'name: ' + "<span>" + userInfo.name.title + " " + userInfo.name.last + "</span>"
    })
    var pAge = $('<p>', {
        html: 'bolking age: ' + "<span>" + userInfo.dob.age + "</span>"
    })
    var pEmail = $('<p>', {
        html: 'email: ' + "<span>" + userInfo.email + "</span>"
    })
    var btnGroup = $("<div>", {
        class: "btn-group align",
        role: "group"
    })
    var btnDel = $('<button>', {
        id: userInfo.login.uuid,
        class: "btn btn-danger",
        text: "delete",
        click: () => {
            cl('clcikeddelF!')
            $('#' + userInfo.login.uuid).remove()
        }
    })
    var btnEdit = $('<button>', {
        id: userInfo.login.uuid,
        class: "btn btn-warning",
        text: "edit",
        click: () => {
            cl('clcikedEdit!');
            // cl($('#' + userInfo.login.uuid + ' p')).each((index,element) => {
            //     console.log($(this).text());
            // });
            //cl($('#' + userInfo.login.uuid + ' p'));
            $($('#' + userInfo.login.uuid + ' span')).each(function (index, element) {
                // cl(element.innerText, index);
                var content = $(element).text();
                var input = $('<input>', {
                    value: content,
                    class: "editInput"
                })
                cl($(element));
                $(element).replaceWith(input);
            });
            $('#' + userInfo.login.uuid + " .btn-group").append(
                $('<button>', {
                    text: "save",
                    class: "btn btn-success",
                    click: (e) => {
                        cl('clickedsuccess!');
                        $('#' + userInfo.login.uuid + ' input').each(function (index, element) {
                            cl(element, index);
                            var content = $(element).val();
                            var spanEdited = $('<span>', {
                                text: content,
                            })
                            $(element).replaceWith(spanEdited);
                        });
                        e.target.remove();
                    }
                })
            )
        }
    });
    btnGroup.append([btnDel, btnEdit])
    container.append([userImg, pGender, pName, pAge, pEmail, btnGroup]);
    $('#userList').append(container);
}