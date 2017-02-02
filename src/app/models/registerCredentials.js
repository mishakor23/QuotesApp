/**
 * Created by baunov on 06/12/16.
 */
export var RegisterCredentials = (function () {
    function RegisterCredentials(username, password, email) {
        if (username === void 0) { username = ""; }
        if (password === void 0) { password = ""; }
        if (email === void 0) { email = ""; }
        this.username = username;
        this.password = password;
        this.email = email;
    }
    return RegisterCredentials;
}());
//# sourceMappingURL=registerCredentials.js.map