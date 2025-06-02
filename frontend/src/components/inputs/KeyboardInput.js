class DefaultMap extends Map {
    constructor(defaultValue) {
        super();
        this.defaultValue = defaultValue;
    }

    get(key) {
        if (!this.has(key)) {
            this.set(key, this.defaultValue());
        }
        return super.get(key);
    }
}

class KeyboardInput {
    keyDownCallbacks = new DefaultMap(() => new Map());

    keyUpCallbacks = new DefaultMap(() => new Map());

    constructor() {
        this._onKeyDown = onKeyDown.bind(this)
        this._onKeyUp = onKeyUp.bind(this)

        window.addEventListener('keydown', this._onKeyDown)
        window.addEventListener('keyup', this._onKeyUp)
    }

    addKeyDownCallback(key, name, callback) {
        this.keyDownCallbacks.get(key).set(name, callback)
    }

    removeKeyDownCallback(key, name) {
        return this.keyDownCallbacks.get(key).delete(name)
    }

    addKeyUpCallback(key, name, callback) {
        this.keyUpCallbacks.get(key).set(name, callback)
    }

    removeKeyUpCallback(key, name) {
        return this.keyUpCallbacks.get(key).delete(name)
    }
}

function onKeyDown(event) {
    if (!this.keyDownCallbacks.has(event.key)) return;
    this.keyDownCallbacks.get(event.key).values().forEach((fn) => {
        fn();
    })
}

function onKeyUp(event) {
    if (!this.keyUpCallbacks.has(event.key)) return;
    this.keyUpCallbacks.get(event.key).values().forEach((fn) => {
        fn();
    })
}

export default KeyboardInput;
