function Scene (args) {
    if (args.frames.length != 0) {
        frames = args.frames;
        currentFrame = -1;
        this.type = "scene";
        this.drawing = false;
        nextFrame = function () {
            if (currentFrame != (frames.length - 1) || currentFrame == -1) {
                currentFrame += 1;
                frames[currentFrame].draw();
            } else {
                canvas.removeEventListener("click", nextFrame);
                frames[currentFrame].draw();
                drawing = false;
            }
        }
        this.start = function () {
            this.drawing = true;
            canvas.addEventListener("click", nextFrame);
        }
    } else {
        throw new Error;
    }
}