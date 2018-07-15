var strChangeableValuesObj = {
    userID: '{{userID}}',
    image: '{{image}}',
    gender: '{{gender}}',
    name: '{{name}}',
    age: '{{age}}',
    email: '{{email}}'
}
var userInfo = {
    userID: userInstance.login.uuid,
    image: userInstance.picture.large,
    gender: userInstance.gender,
    name: userInstance.name.title.capitalize() + " " + userInstance.name.last + "," + userInstance.name.first,
    age: userInstance.dob.age,
    email: userInstance.email,
}
var regEx = new RegExp(
    strChangeableValuesObj.userID + '|' +
    strChangeableValuesObj.image + '|' +
    strChangeableValuesObj.gender + '|' +
    strChangeableValuesObj.name + '|' +
    strChangeableValuesObj.age + '|' +
    strChangeableValuesObj.email + '|' + 'gi'
);


function btnGroupCreate(userID) {
    var btnGroup = $("<div>", {
        class: "btn-group align",
        role: "group"
    })
    var btnDel = $('<button>', {
        id: userID,
        class: "btn btn-danger",
        text: "delete",
        click: () => {
            cl('clcikeddelF!')
            $('#' + userID).remove()
        }
    })
    var btnEdit = $('<button>', {
        id: userID,
        class: "btn btn-warning",
        text: "edit",
        click: () => {
            cl('clcikedEdit!');
            $($('#' + userID + ' span')).each(function(index, element) {
                var content = $(element).text();
                var input = $('<input>', {
                    value: content,
                    class: "editInput"
                })
                cl($(element));
                $(element).replaceWith(input);
            });
            $('#' + userID + " .btn-group").append(
                $('<button>', {
                    text: "save",
                    class: "btn btn-success",
                    click: (e) => {
                        cl('clickedsuccess!');
                        $('#' + userID + ' input').each(function(index, element) {
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
}



//make save button
//find btn group of edit button and append a save button
var btnGroup = $(e.target).closest('.btn-group');
btnGroup.append(
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
);