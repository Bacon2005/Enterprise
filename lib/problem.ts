//No server-only : This file has no secrets and no fetch . Either side may read it.
//It reads e.message : The only part of an error that survives being sent to the browser.
export function problemFor(e: unknown) {
  const m = e instanceof Error ? e.message : "";
  if (m === "timeout") return "The server took too long.";
  if (m === "offline") return "The server did not answer. Check it is running.";
  if (m === "404") return "That is not there any more.";
  return "Something went wrong.";
}
