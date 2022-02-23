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
}

export default Utils;
