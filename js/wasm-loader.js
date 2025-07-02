export async function loadWasm() {
  const wasm = await import("../wasm/pkg/metalife_wasm.js");
  return wasm;
}
