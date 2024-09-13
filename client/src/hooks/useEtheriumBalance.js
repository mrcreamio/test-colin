import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./usePrivate";

const useEthereumBalance = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const { isLoggedIn } = useAuth();
  const axiosPrivateInstance = useAxiosPrivate();

  useEffect(() => {
    const fetchBalance = async () => {
      if (!isLoggedIn) {
        // Reset balance and error if the user is not logged in
        setBalance(null);
        setError("");
        return;
      }

      try {
        const response = await axiosPrivateInstance.get(
          "/api/get-ethereum-balance/"
        );
        setBalance(response.data.ethereum_balance);
        setError("");
      } catch (error) {
        console.error("Failed to fetch Ethereum balance:", error);
        setBalance(null);
        setError("Failed to fetch Ethereum balance");
      }
    };

    fetchBalance();
  }, [isLoggedIn, axiosPrivateInstance]);

  return { balance, error };
};

export default useEthereumBalance;
