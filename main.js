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
            //grab buttons from this instance user.html for assignemnt usage
            $(outputHtml).appendTo($('#userList'));
            //build btn functionality
            // cl($(outputHtml).find('.btn-danger'));
            $('.btn-danger').click((e) => {
                cl($(e.target).closest('.userContainer'));
            });

            $('.btn-edit').click((e) => {
                cl($(e.target).closest('.userContainer'));
            });
        })
    });
}

//capitalize 
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}