import { UserBasicInfo } from './userBasicInfo';
import { Ratings } from './ratings';
import * as _ from "lodash";
/**
 * Created by baunov on 14/10/16.
 */
export var Citation = (function () {
    function Citation(text, author, tags, user, _ratings, date_published) {
        if (text === void 0) { text = ""; }
        if (author === void 0) { author = "Unknown"; }
        if (tags === void 0) { tags = []; }
        if (user === void 0) { user = new UserBasicInfo("Anonymous"); }
        if (_ratings === void 0) { _ratings = new Ratings(); }
        if (date_published === void 0) { date_published = Date.now(); }
        this.text = text;
        this.author = author;
        this.tags = tags;
        this.user = user;
        this._ratings = _ratings;
        this.date_published = date_published;
        //public static curId = 0;
        this.id = "";
        this.views = 0;
        //this._id = String(Citation.curId);
        //Citation.curId++;
    }
    Object.defineProperty(Citation.prototype, "ratings", {
        get: function () {
            return this._ratings;
        },
        set: function (val) {
            if (!this._ratings)
                return;
            this._ratings = val;
        },
        enumerable: true,
        configurable: true
    });
    Citation.pack = function (cit) {
        return _.pick(cit, ["text", "author", "tags", "user", "date_published"]);
    };
    Citation.unpack = function (obj) {
        if (!obj || obj["user"] == null)
            return new Citation("Processing..");
        var user = new UserBasicInfo(obj["user"].id, obj["user"].username, obj["user"].email);
        var ratings = new Ratings();
        var cit = new Citation(obj["text"], obj["author"], obj["tags"], user, ratings, obj["date_published"]);
        cit.id = obj["$key"];
        //console.log(obj);
        return cit;
    };
    return Citation;
}());
//# sourceMappingURL=citation.js.map