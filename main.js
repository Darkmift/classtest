//my beloved console log shortcut <3
var cl = console.log;
cl('online');

/*init stored users from localstorage if set,
empty array if not*/
var storedUsers = localStorage.getItem("storedUsers") != null ? JSON.parse(localStorage.getItem("storedUsers")) : [];

/*
bonus bit:
replace a random contact div every 20 seconds
*/
function someCl(html) {
    //cl(storedUsers[0])
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
    }).then((user) => {
        var userDOMList = $('.userContainer');
        var userDOMListRandomElement = userDOMList[Math.floor(Math.random() * userDOMList.length)];
        $(userDOMListRandomElement).fadeOut('slow').promise().done(() => {
            $(userDOMListRandomElement).replaceWith(buildUser(user.results[0], html));
            $(userDOMListRandomElement).fadeIn('slow');
        });
        setTimeout(() => {
            someCl(html)
        }, 8000);
    });
}
//bonus bit end

//get 10 users on each page load and add to storedUsers array
$.ajax({
        url: 'https://randomuser.me/api/?results=10',
        dataType: 'json',
    })
    .then((user) => {
        user.results.forEach(element => {
                storedUsers.push(element);
            })
            //push new users to localstorage and return storedUsers up the scope
        localStorage.setItem("storedUsers", JSON.stringify(storedUsers));
        return storedUsers;

    }).then(() => {
        //grab user.html for use in builds
        $.get("user.html", (html) => {
            //build a contact div for each storedUsers
            storedUsers.forEach(element => {
                userDiv = buildUser(element, html);
                if ($('#nousersMsg').length) $('#nousersMsg').remove();
                // userDiv.appendTo($('#userList'));
                $('#userList').append(userDiv.hide().fadeIn(1500))
            });
            //assign click function to userspawner button
            //make a contact div on each click
            $('#userspawner').click(function(e) {
                e.preventDefault();
                $.get('https://randomuser.me/api/', (user) => {
                    $('#userList').append(buildUser(user.results[0], html).hide().fadeIn(1500))
                });
            });
            //call recursive function see its description above
            someCl(html);
        }).then(() => {
            //now that dom is populated we can set our button fucntions
            //delete contact
            $('.btn-danger').click((e) => {
                // $(e.target).closest('.userContainer').fadeOut(3000, function() {
                //     $(this).remove();
                // });
                $(e.target).closest('.userContainer').animate({
                    opacity: 0, // animate slideUp
                    marginLeft: '-250px'
                }, 750, 'linear', function() {
                    $(this).remove();
                });
            });

            //edit contact
            $('.btn-edit').click((e) => {
                thisBtn = $(e.target);
                //grab the contact parent of this clicked button 
                var container = $(e.target).closest('.userContainer');

                //define the spans with info to edit
                spanList = container.find('span');

                //define button behaviour
                switch ($(e.target).attr('class')) {
                    case 'btn btn-edit':
                        thisBtn.text('Save'),
                            thisBtn.removeClass('btn-edit'),
                            thisBtn.addClass('btn-success');

                        //convert all span to input
                        spanList.each(function(index, element) {
                            //store span content
                            var content = $(element).text();
                            var input = $('<input>', {
                                value: content,
                                class: "editInput"
                            });
                            //replace span with input for edit
                            $(element).replaceWith(input);
                        });
                        break;
                    case 'btn btn-success':
                        thisBtn.text('Edit'),
                            thisBtn.removeClass('btn-success'),
                            thisBtn.addClass('btn-edit');

                        //replace input with span on save
                        spanList = container.find('input');
                        spanList.each(function(index, element) {
                            //cl(element, index);
                            var content = $(element).val();
                            var spanEdited = $('<span>', {
                                text: content,
                            })
                            $(element).replaceWith(spanEdited);
                        });
                        break;
                }
            });
        });
    });

//capitalize first letter of a string
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//build user div from user.html
function buildUser(user, html) {
    var htmlReplaceValuesObj = {
        userID: user.login.uuid,
        userImage: user.picture.large,
        userGender: user.gender,
        userName: user.name.title.capitalize() + " " + user.name.last.capitalize() + "," + user.name.first.capitalize(),
        userAge: user.dob.age,
        userEmail: user.email,
    }
    var outputHtml = html;
    $.each(htmlReplaceValuesObj, (key, value) => {
        var regEx = new RegExp('{{' + key + '}}', 'gi');
        outputHtml = outputHtml.replace(regEx, value);
    });

    return $(outputHtml);
}