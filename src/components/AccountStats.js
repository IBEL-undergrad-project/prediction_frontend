import React, { useEffect, useState } from "react";
import Utils from "../utils/utils";

function AccountStats({ provider, contract, signer }) {
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState(-1);
  const [lee, setLee] = useState();
  const [yoon, setYoon] = useState();
  const [ahn, setAhn] = useState();
  const [shim, setShim] = useState();
  const [heo, setHeo] = useState();

  useEffect(() => {
    signer.getAddress().then((addr) => {
      setAddress(addr);
      contract.betsPerGambler(addr, Utils.SIDE.LEE).then((result) => {
        setLee(Utils.parseWei(result.toString()));
      });
      contract.betsPerGambler(addr, Utils.SIDE.YOON).then((result) => {
        setYoon(Utils.parseWei(result.toString()));
      });
      contract.betsPerGambler(addr, Utils.SIDE.AHN).then((result) => {
        setAhn(Utils.parseWei(result.toString()));
      });
      contract.betsPerGambler(addr, Utils.SIDE.SHIM).then((result) => {
        setShim(Utils.parseWei(result.toString()));
      });
      contract.betsPerGambler(addr, Utils.SIDE.HEO).then((result) => {
        setHeo(Utils.parseWei(result.toString()));
      });
    });
    signer.getBalance().then((bal) => setBalance(bal));
  }, [signer, contract]);

  return provider.network.chainId === 3 ? (
    <div>
      <div>
        <h3>내 Ropsten 지갑 주소</h3>
        <p>
          <b>{address} </b>
          {balance === -1 ? null : (
            <i>{`(잔액: ${
              Math.floor(parseFloat(Utils.parseWei(balance)) * 100) / 100
            }Ether)`}</i>
          )}
        </p>
      </div>
      <hr />
      <div>
        <h3>나의 각 후보 베팅 현황</h3>
        <p>
          <b>이재명 후보</b>: <b className="text-danger">{lee}</b>Ether
        </p>
        <p>
          <b>윤석열 후보</b>: <b className="text-danger">{yoon}</b>Ether
        </p>
        <p>
          <b>안철수 후보</b>: <b className="text-danger">{ahn}</b>Ether
        </p>
        <p>
          <b>심상정 후보</b>: <b className="text-danger">{shim}</b>Ether
        </p>
        <p>
          <b>허경영 후보</b>: <b className="text-danger">{heo}</b>Ether
        </p>
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
