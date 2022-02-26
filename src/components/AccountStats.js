import React, { useEffect, useState } from "react";
import Utils from "../utils/utils";

function AccountStats({ provider, contract, signer }) {
  const [accountAddress, setAccountAddress] = useState();
  const [accountBettingInfo, setAccountBettingInfo] = useState([]);

  const configureAccountInfo = () => {
    signer.getAddress().then((address) => {
      setAccountAddress(address);
      getAccountInfo(address);
    });
  };

  const getAccountInfo = (address) => {
    const arr = [
      Utils.SIDE.LEE,
      Utils.SIDE.YOON,
      Utils.SIDE.AHN,
      Utils.SIDE.SHIM,
      Utils.SIDE.HEO,
    ];
    const temp = new Array(0);
    arr.forEach((item) => {
      contract
        .betsPerGambler(accountAddress, item)
        .then((result) => temp.push(result.toString()));
    });
    setAccountBettingInfo(temp);
  };

  useEffect(() => {
    configureAccountInfo();
  }, []);

  return provider.network.chainId === 3 ? (
    <div>
      <div>
        <h4>내 Ropsten 지갑 주소</h4>
        <p>{accountAddress}</p>
      </div>
      <div>
        <h4>내 베팅 현황</h4>
        <p>{accountBettingInfo}</p>
      </div>
    </div>
  ) : (
    <h1 className="text-danger">
      ERROR: YOU NEED TO BE IN ROPSTEN TESTNET. CHANGE YOUR METAMASK NETWORK TO
      ROPSTEN TESTNET
    </h1>
  );
}

export default AccountStats;
