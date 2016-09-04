/* global Nauper */
Nauper.Character = function Character(args) {
  var result = {};
  if (args.path && args.emotions.length !== 0) {
    args.emotions.forEach(function characterEmotions(emotion) {
      result[emotion] = args.path + '/' + emotion + '.png';
    });
    return result;
  }
  throw new Error();
};
