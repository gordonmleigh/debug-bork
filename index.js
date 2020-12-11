async function main() {
  debugger;
  console.log(process.version);
  await Promise.resolve();
  console.log("hello world");
}

main().then(undefined, (err) => {
  console.error(`fatal`, err);
  process.exit(1);
});
