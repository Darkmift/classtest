var cl = console.log;
cl('online');

$('#userspawner').click(function(e) {
    e.preventDefault();
    makeUser(1);
});

function makeUser(int) {

    $.get("user.html", (html) => {
        $.get('https://randomuser.me/api/?results=' + int, (user) => {
            var userInstance = user.results[0];
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
            $(outputHtml + '> .btn btn-danger').click(() => {
                cl('clicked del!')
                $('#' + userInstance.login.uuid).remove()
            });

            //remove empty notice
            if ($('#nousersMsg').length) $('#nousersMsg').remove();

            //grab buttons from this instance user.html for assignemnt usage
            $(outputHtml).appendTo($('#userList'));

            //build btn functionality
            // cl($(outputHtml).find('.btn-danger'));

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
                    cl($(element));
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
                            cl('clickedsuccess!');
                            spanList = container.find('input');
                            spanList.each(function(index, element) {
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
            });
            //ask why its cl more than once...meanwhile ternary checking if hasclass then do not add anymore
        });
    });
}

//capitalize 
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}




// $('#' + user.login.uuid + " .btn-group").append(
//     $('<button>', {
//         text: "save",
//         class: "btn btn-success",
//         click: (e) => {
//             cl('clickedsuccess!');
//             $('#' + user.login.uuid + ' input').each(function(index, element) {
//                 cl(element, index);
//                 var content = $(element).val();
//                 var spanEdited = $('<span>', {
//                     text: content,
//                 })
//                 $(element).replaceWith(spanEdited);
//             });
//             e.target.remove();
//         }
//     })
// )