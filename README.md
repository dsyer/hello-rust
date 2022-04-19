Broadly following this useful [tutorial](https://rustwasm.github.io/book/game-of-life/setup.html), which details all the prerequiistes. Attempt to build it (expect some warnings as well):

```
$ wasm-pack build --target web
...
warning: function is never used: `set_panic_hook`
 --> src/utils.rs:1:8
  |
1 | pub fn set_panic_hook() {
  |        ^^^^^^^^^^^^^^
  |
  = note: `#[warn(dead_code)]` on by default

warning: `hello-rust` (lib) generated 1 warning
    Finished release [optimized] target(s) in 12.57s
[INFO]: Installing wasm-bindgen...
[INFO]: Optional fields missing from Cargo.toml: 'description', 'repository', and 'license'. These are not necessary, but recommended
[INFO]: :-) Done in 16.03s
[INFO]: :-) Your wasm pkg is ready to publish at /home/dsyer/dev/scratch/hello-rust/pkg.
[WARN]: :-) [60] SSL peer certificate or SSH remote key was not OK (SSL certificate problem: unable to get local issuer certificate)
```

The JavaScript is so trivial we could embed it directly in the `index.html`:

```html
<html>

<body>
	<h2>Hello</h2>
	<script type="module">
		import init, { greet } from "./hello_rust.js";
		await init();
		greet();
	</script>
</body>

</html>
```

For Node.js we need a wrapper (`bundle.js`) that defines some shims for the browser:

```javascript
globalThis.alert = (...args) => {
    console.log(...args);
}

import init, { greet } from "./hello_rust.js";
const bytes = fs.readFileSync(path.dirname(import.meta.url).replace('file://', '') + '/hello_rust_bg.wasm');
await init(bytes);

export { greet };
```

Run it after building the Spring Boot project so that the static resources are copied over to `./target`:

```javascript
$ node
Welcome to Node.js v16.14.2.
Type ".help" for more information.
> var {greet} = await import('./target/classes/static/bundle.js')
> greet()
Hello, hello-rust!
```