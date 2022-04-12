Broadly following this useful [tutorial](https://rustwasm.github.io/book/game-of-life/setup.html), we can get started with:

```
$ cargo install cargo-generate
```

It failed about 4 times for me while I sorted out its dependencies, and made space for it in `TMPDIR`. Seems like a lot of hassle for a code generator that I'm going to use approximately once. Oh well.

Generate the demo project:

```
$ cargo generate --git https://github.com/rustwasm/wasm-pack-template .
🤷   Project Name : hello-rust
...
$ mv hello-rust/* .
$ mv hello-rust/.??* .
$ rm -rf hello-rust
```

Attempt to build it (expect some warnings as well):

```
$ wasm-pack build
...
[INFO]: Installing wasm-bindgen...
Error: failed to download from https://github.com/WebAssembly/binaryen/releases/download/version_90/binaryen-version_90-x86-linux.tar.gz
To disable `wasm-opt`, add `wasm-opt = false` to your package metadata in your `Cargo.toml`.
```

There's nothing wrong with that link, so what gives? There's a comment in the `Cargo.toml` about needing nightly builds of Rust. So

```
$ rustup install nightly
$ rustup default nightly
```

Same error on build. We can follow the hint, but a) it's really imprecise, and b) we might eventually want to optimize. So in `Cargo.toml`:

```toml
[package.metadata.wasm-pack.profile.release]
wasm-opt = false
```

then we can build:

```
$ wasm-pack build
...
[INFO]: Optional fields missing from Cargo.toml: 'description', 'repository', and 'license'. These are not necessary, but recommended
[INFO]: :-) Done in 0.58s
[INFO]: :-) Your wasm pkg is ready to publish at /home/dsyer/dev/scratch/hello-rust/pkg.
[WARN]: :-) [60] SSL peer certificate or SSH remote key was not OK (SSL certificate problem: unable to get local issuer certificate)
$ ls pkg/
README.md  hello_rust.d.ts  hello_rust.js  hello_rust_bg.js  hello_rust_bg.wasm  hello_rust_bg.wasm.d.ts  package.json
```

We can use that `pkg` as a module in a Node.js app, like it describes in the tutorial. It pops up an alert in the browswer.