var cl = console.log;
cl('online');
var storedUsers = localStorage.getItem("storedUsers") != null ? JSON.parse(localStorage.getItem("storedUsers")) : [];

//bonus bit
function someCl(html) {
    //cl(storedUsers[0])
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
    }).then((user) => {
        cl('durr', user.results[0].name.first)
        var userDOMList = $('.userContainer');
        var userDOMListRandomElement = userDOMList[Math.floor(Math.random() * userDOMList.length)];
        cl(userDOMListRandomElement.id);
        $(userDOMListRandomElement).replaceWith(buildUser(user.results[0], html));
        setTimeout(() => {
            someCl(html)
        }, 5000);
    });

}
//bonus bit end

//get 10 users on each refresh and add to storedUsers array
$.ajax({
        url: 'https://randomuser.me/api/?results=10',
        dataType: 'json',
    })
    .then((user) => {
        user.results.forEach(element => {
            storedUsers.push(element);
        })
        localStorage.setItem("storedUsers", JSON.stringify(storedUsers));
        return storedUsers;

    }).then(() => {
        $.get("user.html", (html) => {
            storedUsers.forEach(element => {
                userDiv = buildUser(element, html);
                if ($('#nousersMsg').length) $('#nousersMsg').remove();
                userDiv.appendTo($('#userList'));
            })
            someCl(html);
        }).then(() => {
            //now that dom is populated we can set our button fucntions
            //delete contact
            $('.btn-danger').click((e) => {
                $(e.target).closest('.userContainer').remove();
            });

            //edit contact
            $('.btn-edit').click((e) => {
                //grab the contact parent of this clicked button 
                var container = $(e.target).closest('.userContainer');
                //define the spans with info to edit
                spanList = container.find('span');
                //convert all span to input
                spanList.each(function(index, element) {
                    var content = $(element).text();
                    var input = $('<input>', {
                            value: content,
                            class: "editInput"
                        })
                        //cl($(element));
                    $(element).replaceWith(input);
                });
                //make save button
                //find btn group of edit button and append a save button
                var btnGroup = $(e.target).closest('.btn-group');
                $(btnGroup).find('button.btn-success').length !== 0 ? cl('it does') : btnGroup.append(
                    $('<button>', {
                        text: "save",
                        class: "btn btn-success",
                        click: (e) => {
                            //cl('clickedsuccess!');
                            spanList = container.find('input');
                            spanList.each(function(index, element) {
                                //cl(element, index);
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
            });
        });
    });

$('#userspawner').click(function(e) {
    e.preventDefault();
    makeUser(1);
});


function makeUser(user) {
    $.get("user.html", (html) => {
        $.get('https://randomuser.me/api/', (user) => {
            buildUser(user.results[0], html);
        });
    });
}

//capitalize first letter of a string
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function buildUser(user, html) {
    var userInstance = user;
    var htmlReplaceValuesObj = {
        userID: userInstance.login.uuid,
        userImage: userInstance.picture.large,
        userGender: userInstance.gender,
        userName: userInstance.name.title.capitalize() + " " + userInstance.name.last.capitalize() + "," + userInstance.name.first.capitalize(),
        userAge: userInstance.dob.age,
        userEmail: userInstance.email,
    }
    var outputHtml = html;
    $.each(htmlReplaceValuesObj, (key, value) => {
        var regEx = new RegExp('{{' + key + '}}', 'gi');
        outputHtml = outputHtml.replace(regEx, value);
    });

    return $(outputHtml);
}