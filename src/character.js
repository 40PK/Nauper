/* global Nauper */
Nauper.Character = function Character(args) {
  let result = {};
  args.emotions.forEach(function characterEmotions(emotion) {
    result[emotion] = `${args.path}/${emotion}.png`;
  });
  return result;
};
