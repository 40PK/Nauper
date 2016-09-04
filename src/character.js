/* global Nauper */
Nauper.Character = function Character(args) {
  if (args.path && args.emotions.length !== 0) {
    var result = {};
    args.emotions.forEach(function characterEmotions(emotion) {
      result[emotion] = args.path + '/' + emotion + '.png';
    });
    return result;
  }
  throw new Error();
};
