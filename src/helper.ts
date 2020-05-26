const constants = require('./constants');


const is_email = (str : string) => {
    return  /^[\w+\d+._]+\@[\w+\d+_+]+\.[\w+\d+._]{2,8}$/.test(str);
};


function isAdmin(role) {
    return role === constants.roles.admin;
}

function isUser(role) {
    return role === constants.roles.user;
}

module.exports = {is_email, isAdmin, isUser}