/**
 * Created by baunov on 08/01/17.
 */
export var CitationData = (function () {
    function CitationData(text, author, tags) {
        if (text === void 0) { text = ""; }
        if (author === void 0) { author = ""; }
        if (tags === void 0) { tags = []; }
        this.text = text;
        this.author = author;
        this.tags = tags;
    }
    return CitationData;
}());
//# sourceMappingURL=citationData.js.map