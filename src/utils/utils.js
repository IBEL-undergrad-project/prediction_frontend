import { ethers } from "ethers";

const contractAddress = "0x967f25c1525147eab29f1c0691e1a8167f30b439";
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
      {
        internalType: "uint256",
        name: "_electionStartDate",
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
  },
  {
    inputs: [],
    name: "electionStartDate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
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
  },
  {
    inputs: [],
    name: "resultReported",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
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

  static SIDEenumerator = () => {
    return [
      this.SIDE.LEE,
      this.SIDE.YOON,
      this.SIDE.AHN,
      this.SIDE.SHIM,
      this.SIDE.HEO,
    ];
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
    if (window.ethereum == null) {
      window.alert(
        "You need to have MetaMask installed\nInstall MetaMask and refresh this page"
      );
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []).catch((err) => {
      if (err.code === -32002) {
        window.alert(
          "메타마스크에 연결이 되지 않았습니다.\n메타마스크에 연결되어있지 않으면 서비스를 이용하실 수 없으니 연결 여부를 꼭 확인해주세요."
        );
      }
    });
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

  static parseWei = (wei) => {
    return ethers.utils.formatEther(wei);
  };

  static updateData = async (contract) => {
    const tempArr = [];
    for (let i = 0; i < this.SIDEenumerator().length; i++) {
      const result = await contract.bets(i);
      tempArr.push(this.parseWei(result));
    }
    return tempArr;
  };

  static wrapChartData = (data = [1, 1, 1, 1, 1]) => {
    return {
      labels: ["이재명", "윤석열", "안철수", "심상정", "허경영"],
      datasets: [
        {
          label: "My First Dataset",
          data: data,
          backgroundColor: [
            "#4FC1E8",
            "#ED5564",
            "#A0D568",
            "#FFCE54",
            "#AC92EB",
          ],
          hoverOffset: 4,
        },
      ],
    };
  };

  static getAllocRatio = (stats) => {
    const total = stats.map((item) => parseFloat(item)).reduce((a, b) => a + b);
    const tempArr = stats.map((item) => Math.floor((total / item) * 100) / 100);

    return this.SIDEenumerator().map((iterator) => {
      return { key: iterator, ratio: tempArr[iterator] };
    });
  };

  static getBettingEndDate = async (contract) => {
    let date = new Date((await contract.ElectionStartDate()) * 1000);

    return date;
  };
}

export default Utils;
