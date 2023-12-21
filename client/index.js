const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
const serverUrl = "http://localhost:1225";
const readline = require("readline");

/*const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What is your name? ", (name) => {
  console.log("You entered: " + name);
  rl.close();
});*/
const name = "Anifowose Temitope";
async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();
  console.log(root);
  const index = niceList.findIndex((n) => n === name);
  console.log(index);
  const proof = merkleTree.getProof(index);
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name: name,
    proof: proof,
  });

  console.log({ gift });
}

main();
