class MouseInput {
    hoverCallbacks = new Map();

    clickCallbacks = new Map();

    addHoverCallback(key, callback) {
        this.hoverCallbacks.set(key, callback);
    }

    removeHoverCallback(key) {
        return this.hoverCallbacks.delete(key);
    }

    triggerHover(x, y, z) {
        this.hoverCallbacks.forEach((fn) => {
            fn(x, y, z);
        })
    }

    addClickCallback(key, callback) {
        this.clickCallbacks.set(key, callback);
    }

    removeClickCallback(key) {
        return this.clickCallbacks.delete(key);
    }

    triggerClick() {
        this.clickCallbacks.forEach((fn) => {
            fn();
        })
    }
}

export default MouseInput;
