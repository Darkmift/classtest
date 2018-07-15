var cl = console.log;
cl('online');
var storedUsers = localStorage.getItem("storedUsers") != null ? JSON.parse(localStorage.getItem("storedUsers")) : [];

$.ajax({
        url: 'https://randomuser.me/api/?results=10',
        dataType: 'json',
    })
    .then((user) => {
        user.results.forEach(element => {
            storedUsers.push(element);
            return storedUsers;
        })

    }).then(() => {
        storedUsers.forEach(element => {
            userMaker(element);
        })
        cl(storedUsers.length);
        localStorage.setItem("storedUsers", JSON.stringify(storedUsers));
    });

$('#userspawner').click(function(e) {
    e.preventDefault();
    $.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
        })
        .then((user) => {
            userMaker(user.results[0]);
        })
});

function userMaker(user) {
    if ($('#nousersMsg').length) $('#nousersMsg').remove();
    var container = $('<div>', {
        class: 'userContainer',
        id: user.login.uuid,
    });

    var userImg = $('<img>', {
        src: user.picture.large,
        alt: user.name.last
    })
    var pGender = $('<p>', {
        html: 'gender: ' + "<span>" + user.gender + "</span>"
    })
    var pName = $('<p>', {
        html: 'name: ' + "<span>" + user.name.title + " " + user.name.last + "</span>"
    })
    var pAge = $('<p>', {
        html: 'bolking age: ' + "<span>" + user.dob.age + "</span>"
    })
    var pEmail = $('<p>', {
        html: 'email: ' + "<span>" + user.email + "</span>"
    })
    var btnGroup = $("<div>", {
        class: "btn-group align",
        role: "group"
    })
    var btnDel = $('<button>', {
        id: user.login.uuid,
        class: "btn btn-danger",
        text: "delete",
        click: () => {
            cl('clcikeddelF!')
            $('#' + user.login.uuid).remove()
        }
    })
    var btnEdit = $('<button>', {
        id: user.login.uuid,
        class: "btn btn-warning",
        text: "edit",
        click: () => {
            cl('clcikedEdit!');
            $($('#' + user.login.uuid + ' span')).each(function(index, element) {
                var content = $(element).text();
                var input = $('<input>', {
                    value: content,
                    class: "editInput"
                })
                cl($(element));
                $(element).replaceWith(input);
            });
            $('#' + user.login.uuid + " .btn-group").append(
                $('<button>', {
                    text: "save",
                    class: "btn btn-success",
                    click: (e) => {
                        cl('clickedsuccess!');
                        $('#' + user.login.uuid + ' input').each(function(index, element) {
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