// For Node.js

globalThis.alert = (...args) => {
    console.log(...args);
}

import init, { greet } from "./hello_rust.js";
const bytes = fs.readFileSync(path.dirname(import.meta.url).replace('file://', '') + '/hello_rust_bg.wasm');
await init(bytes);

export { greet };