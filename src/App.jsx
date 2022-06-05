import {
  useAddress,
  useMetamask,
  useEditionDrop,
  useToken,
} from "@thirdweb-dev/react";
import { useEffect, useState, useMemo, useCallback } from "react";

const EDITION_DROP_ADDRESS = "0x458E37d2Ec90cf031cf07740E82a6281aDb99314";
const TOKEN_ADDRESS = "0xC0c002Dd442B6e48f7d7Aff66457cc2b20B40027";

const shortenAddress = (str) => {
  return str.substring(0, 6) + "..." + str.substring(str.length - 4);
};

export const App = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const editionDrop = useEditionDrop(EDITION_DROP_ADDRESS);
  const token = useToken(TOKEN_ADDRESS);

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [memberAddresses, setMemberAddresses] = useState([]);
  const [memberTokenBalances, setMemberTokenBalances] = useState([]);

  const getAllAddresses = useCallback(async () => {
    if (!hasClaimedNFT) {
      return;
    }

    try {
      const addresses = await editionDrop.history.getAllClaimerAddresses(0);
      setMemberAddresses(addresses);
      console.log("🚀 Members addresses", memberAddresses);
    } catch (error) {
      console.error("failed to get member list", error);
    }
  }, [editionDrop.history, hasClaimedNFT, memberAddresses]);

  const getAllBalances = useCallback(async () => {
    if (!hasClaimedNFT) {
      return;
    }
    try {
      const balances = await token.history.getAllHolderBalances();
      setMemberTokenBalances(balances);
      console.log("👜 Amounts", balances);
    } catch (error) {
      console.error("failed to get member balances", error);
    }
  }, [hasClaimedNFT, token.history]);

  const checkBalance = useCallback(async () => {
    if (!address) {
      return;
    }
    try {
      const balance = await editionDrop.balanceOf(address, 0);
      if (balance.gt(0)) {
        setHasClaimedNFT(true);
        console.log("🌟 this user has a membership NFT!");
      } else {
        setHasClaimedNFT(false);
        console.log("😭 this user doesn't have a membership NFT.");
      }
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to get balance", error);
    }
  }, [address, editionDrop]);

  useEffect(() => {
    checkBalance();
    getAllAddresses();
    getAllBalances();
  }, [checkBalance, getAllAddresses, getAllBalances]);

  const mintNFT = useCallback(async () => {
    setIsClaiming(true);
    try {
      await editionDrop.claim(0, 1);
      console.log(
        `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`
      );
      setHasClaimedNFT(true);
    } catch (error) {
      setHasClaimedNFT(false);
      console.error("Failed to mint NFT", error);
    } finally {
      setIsClaiming(false);
    }
  }, [editionDrop]);

  const memberList = useMemo(
    () =>
      memberAddresses.map((address) => {
        const member = memberTokenBalances.find(
          ({ holder }) => holder === address
        );
        return {
          address: shortenAddress(address),
          balance: member?.balance.displayValue ?? 0,
        };
      }),
    [memberAddresses, memberTokenBalances]
  );

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🍪Раздел для участников</h1>
        <p>Поздравляем! Вы участник FogelDAO</p>
        <h2>Список участников</h2>
        <table className="card">
          <thead>
            <tr>
              <th>Адрес</th>
              <th>Количество токенов</th>
            </tr>
          </thead>
          <tbody>
            {memberList.map(({ address, balance }) => {
              return (
                <tr>
                  <td>{address}</td>
                  <td>{balance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  if (address) {
    return (
      <div className="mint-nft">
        <h1>Добро пожаловать в FogelDAO</h1>
        <button disabled={hasClaimedNFT} onClick={mintNFT}>
          {isClaiming
            ? "Подождите немного..."
            : "Получить NFT участинка (бесплатно)"}
        </button>
      </div>
    );
  }

  return (
    <div className="landing">
      <h1>Добро пожаловать в FogelDAO</h1>
      <button className="btn-hero" onClick={connectWithMetamask}>
        Подключить кошелек
      </button>
    </div>
  );
};
