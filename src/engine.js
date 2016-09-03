function Engine (elements) {
    if (elements.length != 0) {
        render_ = function (id) {
            elements.forEach(function (i, index, array) {
                if (index == id) {
                    if (i.type == "scene") {
                        i.start();
                        id++;
                    } else if (i.type == "question") {
                        render_(i.draw());
                    }
                }
            });
        }
        this.start = function () {
            render_(0);
            return true;
        }
    } else {
        throw new Error;
    }
}