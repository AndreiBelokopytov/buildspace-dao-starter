import { useAddress, useMetamask, useEditionDrop } from "@thirdweb-dev/react";
import { useEffect, useState, useCallback } from "react";

const EDITION_DROP_ADDRESS = "0x458E37d2Ec90cf031cf07740E82a6281aDb99314";

export const App = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const editionDrop = useEditionDrop(EDITION_DROP_ADDRESS);
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    const checkBalance = async () => {
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
    };

    checkBalance();
  }, [address, editionDrop]);

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


  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🍪Раздел для участников</h1>
        <p>Поздравляем! Вы участник FogelDAO</p>
      </div>
    )
  }

  if (address) {
    return (
      <div className="mint-nft">
        <h1>Добро пожаловать в FogelDAO</h1>
        <button disabled={hasClaimedNFT} onClick={mintNFT} >
          {isClaiming ? 'Подождите немного...' : 'Получить NFT участинка (бесплатно)'}
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
