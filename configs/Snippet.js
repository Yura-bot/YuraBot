module.exports.insufficientPermissions = (user) => {
    return user.toString()+", vous n'avez pas les permissions suffisantes.";
}