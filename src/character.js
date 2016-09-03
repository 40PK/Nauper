function Character (args) {
    if (args.path && args.emotions.length != 0) {
        var result = {};
        args.emotions.forEach(function (emotion, index, array) {
            result[emotion] = args.path + "/" + emotion + ".png";
        });
        return result;
    } else {
        throw new Error;
    }
}