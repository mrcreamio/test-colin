import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import useEthereumBalance from "../hooks/useEtheriumBalance";

export default function Home() {
  const { user, isLoggedIn } = useAuth();
  const getUser = useUser();
  const { balance: ethBalance, error } = useEthereumBalance();

  useEffect(() => {
    if (isLoggedIn) {
      getUser();
    }
  }, []);

  return (
    <div className='container mt-3'>
      <h2>
        <div className='row'>
          <div className='mb-12'>
            {isLoggedIn ? (
              <div>
                <p>Welcome, {user.email}</p>
                <p>
                  Your Ethereum Balance:{" "}
                  {ethBalance !== null ? `${ethBalance} ETH` : "Loading..."}
                </p>
                {error && <p className='text-danger'>{error}</p>}
              </div>
            ) : (
              <p>Please login first</p>
            )}
          </div>
        </div>
      </h2>
    </div>
  );
}
