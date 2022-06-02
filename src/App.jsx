import { useAddress, useMetamask } from "@thirdweb-dev/react";

const App = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();

  if (address) {
    return (
      <div className="landing">
        <h1>👀 Готовы начать?</h1>
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

export default App;
