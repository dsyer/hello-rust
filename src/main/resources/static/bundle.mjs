var bytes;

if (typeof fetch === 'undefined') {
  let dir = await import('path').then(path => path.dirname(import.meta.url).replace('file:/', ''));
  bytes = await import('fs').then(fs => fs.readFileSync(dir + '/hello_rust_bg.wasm'));
} else {
  bytes = await fetch('./hello_rust_bg.wasm').then(response => response.arrayBuffer());
}

const decoder = new TextDecoder();

let memory;
let imports = {"./hello_rust_bg.js": {"__wbg_alert_a899de29f2865bbe": (ptr,len) => console.log(decoder.decode(new Uint8Array(memory.buffer, ptr, len)))}}
var wasm = await WebAssembly.instantiate(bytes, imports);
memory = wasm.instance.exports.memory;
let greet = () => {
  wasm.instance.exports.greet();
}

export {greet};
export default greet;
