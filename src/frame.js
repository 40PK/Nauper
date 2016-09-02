function Frame (args) {
	// index, characters, positions, display order
	if (args.index && args.characters.length != 0 && args.displayOrder.length != 0) {
		this.index = args.index;
		this.characters = args.characters;
		this.displayOrder = args.displayOrder;
		this.draw = function () {
			this.displayOrder.forEach(function (i, index, array) {
				var img = new Image();
				img.onload = function () {
					if (i == 0) {
						render.drawImage(img, 0, 0);
					} else if (i == 1) {
						render.drawImage(img, size.width * 0.25, 0);
					} else if (i == 2) {
						render.drawImage(img, size.width * 0.50, 0);
					} else if (i == 3) {
						render.drawImage(img, size.width * 0.75, 0);
					}
				}
				img.src = characters[i];
			});
		}
		this.setText = function (text) {}
	} else {
		throw new Error;
	}
}