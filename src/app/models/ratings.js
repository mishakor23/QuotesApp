export var Ratings = (function () {
    function Ratings(likesAr, dislikesAr) {
        var _this = this;
        if (likesAr === void 0) { likesAr = ["dummy"]; }
        if (dislikesAr === void 0) { dislikesAr = ["dummy"]; }
        //public static curId = 0;
        //TODO store likes and dislikes
        this.likes = new Set();
        this.dislikes = new Set();
        likesAr.forEach(function (like) {
            _this.likes.add(like);
        });
        dislikesAr.forEach(function (dislike) {
            _this.dislikes.add(dislike);
        });
    }
    Ratings.prototype.getRank = function () {
        return this.likes.size - this.dislikes.size;
    };
    Ratings.prototype.isLikedBy = function (userId) {
        return this.likes.has(userId);
    };
    Ratings.prototype.isDislikedBy = function (userId) {
        return this.dislikes.has(userId);
    };
    Ratings.prototype.isRatedBy = function (userId) {
        return this.isLikedBy(userId) || this.isDislikedBy(userId);
    };
    //remove like, put dislike
    Ratings.prototype.dislike = function (user) {
        if (this.dislikes.has(user.id)) {
            this.unvote(user);
            return;
        }
        this.likes.delete(user.id);
        this.dislikes.add(user.id);
    };
    Ratings.prototype.like = function (user) {
        if (this.likes.has(user.id)) {
            this.unvote(user);
            return;
        }
        this.dislikes.delete(user.id);
        this.likes.add(user.id);
    };
    Ratings.prototype.unvote = function (user) {
        this.likes.delete(user.id);
        this.dislikes.delete(user.id);
    };
    Ratings.pack = function (rating) {
        var obj = {};
        rating.likes.forEach(function (like) {
            obj[like] = true;
        });
        rating.dislikes.forEach(function (dislike) {
            obj[dislike] = false;
        });
        return obj;
    };
    /*public static unpack(obj:Object):Ratings
    {
      if(!obj) return new Ratings();
      let likes:UserBasicInfo[] = obj["likes"];
      let dislikes:UserBasicInfo[] = obj["dislikes"];
      return new Ratings(likes, dislikes);
    }*/
    Ratings.unpack = function (obj) {
        console.log("OBJECT");
        console.log(obj);
        var ratings = new Ratings();
        if (!obj)
            return ratings;
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var key = _a[_i];
            if (obj[key] == true) {
                ratings.likes.add(key);
            }
            else if (obj[key] === false) {
                ratings.dislikes.add(key);
            }
        }
        return ratings;
    };
    return Ratings;
}());
//# sourceMappingURL=ratings.js.map