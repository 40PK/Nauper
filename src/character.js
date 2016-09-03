function Character(args) { // eslint-disable-line no-unused-vars
  if (args.path && args.emotions.length !== 0) {
    var result = {};
    args.emotions.forEach(function characterEmotions(emotion) {
      result[emotion] = args.path + '/' + emotion + '.png';
    });
    return result;
  }
  throw new Error();
}
