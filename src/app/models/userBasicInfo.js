/**
 * Created by baunov on 06/12/16.
 */
export var UserBasicInfo = (function () {
    function UserBasicInfo(id, username, email) {
        if (username === void 0) { username = ""; }
        if (email === void 0) { email = ""; }
        this.id = id;
        this.username = username;
        this.email = email;
    }
    return UserBasicInfo;
}());
//# sourceMappingURL=userBasicInfo.js.map