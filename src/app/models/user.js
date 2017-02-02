/**
 * Created by baunov on 14/10/16.
 */
export var User = (function () {
    function User(id, username, password, email, rank, subscribers) {
        if (id === void 0) { id = ""; }
        if (username === void 0) { username = ""; }
        if (password === void 0) { password = ""; }
        if (email === void 0) { email = ""; }
        if (rank === void 0) { rank = 0; }
        if (subscribers === void 0) { subscribers = []; }
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.rank = rank;
        this.subscribers = subscribers;
        //this._id = String(User.curId);
        //User.curId++;
    }
    return User;
}());
//# sourceMappingURL=user.js.map