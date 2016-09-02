function Character (args) {
	if (args.name && args.path && args.color && args.emotions.length != 0) {
		args.emotions.forEach(function (emotion, index, array) {
			this[emotion] = path + "/" + emotion;
		});
		this.name = args.name;
		this.color = args.color;
	} else {
		throw new Error;
	}
}