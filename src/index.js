// Environment Variables
import "@babel/polyfill";
import app from "./app";

async function main() {
  await app.listen(app.get("port"));
  console.log(`Server on port ${app.get("port")}`);
}

// Start The Server
main();
