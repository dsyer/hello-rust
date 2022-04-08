with import <nixpkgs> { };

mkShell {

  name = "env";
  buildInputs = [
    cargo rustc wasm-pack openssl gccStdenv glibc pkg-config emscripten nodejs cmake check wasmtime wabt
  ];

  shellHook = ''
    mkdir -p ~/.emscripten
    cp -rf ${emscripten}/share/emscripten/cache ~/.emscripten
    export EM_CACHE=~/.emscripten/cache
    export TMP=/tmp
    export TMPDIR=/tmp
  '';

}