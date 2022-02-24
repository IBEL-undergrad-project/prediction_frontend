class Utils {
  static mapSurnameToName = (name) => {
    switch (name) {
      case "lee":
        return "이재명";
      case "yoon":
        return "윤석열";
      case "ahn":
        return "안철수";
      case "shim":
        return "심상정";
      case "heo":
        return "허경영";
      default:
        return null;
    }
  };

  static getStatusDataFromEthereum = () => {
    return null;
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
}

export default Utils;
