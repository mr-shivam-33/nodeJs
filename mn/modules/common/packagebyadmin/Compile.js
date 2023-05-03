const path = require("path");
const fs = require("fs");
const solc = require("solc");

const contractPath = path.resolve(__dirname, "./MedSure.sol");
const source = fs.readFileSync(contractPath, "utf-8");

var input = {
  language: "Solidity",
  sources: {
    "./MedSure.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
var interface = output.contracts["./MedSure.sol"]["ControlPrint"].abi;

var bytecode =
  output.contracts["./MedSure.sol"]["ControlPrint"].evm.bytecode.object;

module.exports = { interface, bytecode };
