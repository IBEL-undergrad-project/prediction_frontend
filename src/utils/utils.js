import { ethers } from "ethers";

const contractAddress = "0x11734780505Ef9FadF27fF2119d16178C8433A7f";
const contractAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_oracle",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_commissionPercentage",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "enum Prediction.Side",
        name: "",
        type: "uint8",
      },
    ],
    name: "bets",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "enum Prediction.Side",
        name: "",
        type: "uint8",
      },
    ],
    name: "betsPerGambler",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "commissionPercentage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "electionFinished",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "oracle",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "result",
    outputs: [
      {
        internalType: "enum Prediction.Side",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "enum Prediction.Side",
        name: "_side",
        type: "uint8",
      },
    ],
    name: "placeBet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [],
    name: "withdrawGain",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Prediction.Side",
        name: "_winner",
        type: "uint8",
      },
    ],
    name: "reportResult",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

class Utils {
  static SIDE = {
    LEE: 0,
    YOON: 1,
    AHN: 2,
    SHIM: 3,
    HEO: 4,
  };

  static mapSurnameToName = (name) => {
    switch (name) {
      case "lee":
      case this.SIDE.LEE:
        return "이재명";
      case "yoon":
      case this.SIDE.YOON:
        return "윤석열";
      case "ahn":
      case this.SIDE.AHN:
        return "안철수";
      case "shim":
      case this.SIDE.SHIM:
        return "심상정";
      case "heo":
      case this.SIDE.HEO:
        return "허경영";
      default:
        return null;
    }
  };

  static mapSurnameToSIDE = (surname) => {
    switch (surname) {
      case "lee":
        return this.SIDE.LEE;
      case "yoon":
        return this.SIDE.YOON;
      case "ahn":
        return this.SIDE.AHN;
      case "shim":
        return this.SIDE.SHIM;
      case "heo":
        return this.SIDE.HEO;
      default:
        return null;
    }
  };

  static connectWalletHandler = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          return result;
        });
    } else {
      window.alert(
        "You don't have MetaMask.\nInstall MetaMask to use this service."
      );
    }
  };

  static configureEthereumConnection = async () => {
    while (window.ethereum == null) {
      window.alert(
        "You need to have MetaMask installed\nInstall MetaMask and refresh this page"
      );
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    return {
      provider: provider,
      signer: signer,
      contract: contract,
    };
  };

  static parseEther = (ether) => {
    return ethers.utils.parseEther(ether);
  };
}

export default Utils;