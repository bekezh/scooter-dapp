import { useState, useEffect } from "react";
import { ethers } from "ethers";

const TOKEN_ADDRESS = "0x..."; // адрес токена SRT
const ABI = []; // ABI смарт-контракта

export default function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("0");
  const [dividends, setDividends] = useState("0");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const addr = await signer.getAddress();

        const contract = new ethers.Contract(TOKEN_ADDRESS, ABI, signer);
        const bal = await contract.balanceOf(addr);
        const total = await contract.totalSupply();
        const stablecoinAddr = await contract.stablecoin();
        const stablecoin = new ethers.Contract(stablecoinAddr, ["function balanceOf(address) view returns (uint256)"], provider);
        const dividendPool = await stablecoin.balanceOf(TOKEN_ADDRESS);
        const payout = (bal * dividendPool) / total;

        setAccount(addr);
        setBalance(ethers.formatUnits(bal, 18));
        setDividends(ethers.formatUnits(payout, 6));
      }
    };
    init();
  }, []);

  const claim = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(TOKEN_ADDRESS, ABI, signer);
    const tx = await contract.claimDividends();
    await tx.wait();
    alert("Дивиденды получены!");
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md space-y-4 text-center">
      <h1 className="text-2xl font-bold">ScooterRentToken Dashboard</h1>
      <p>Ваш адрес: <b>{account}</b></p>
      <p>Баланс токенов SRT: <b>{balance}</b></p>
      <p>Доступно к выплате: <b>${dividends} USDT</b></p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={claim}>Получить дивиденды</button>
    </div>
  );
}