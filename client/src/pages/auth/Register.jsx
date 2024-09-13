import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/apiConfig";

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const first_name = useRef();
  const last_name = useRef();
  const email = useRef();
  const password = useRef();
  const password2 = useRef(undefined);
  const ethereumWalletAddress = useRef();

  async function onSubmitForm(event) {
    event.preventDefault();
    const data = {
      first_name: first_name.current.value,
      last_name: last_name.current.value,
      email: email.current.value,
      password: password.current.value,
      password2: password2.current.value,
      ethereum_wallet_address: ethereumWalletAddress.current.value,
    };

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "auth/register",
        JSON.stringify(data)
      );

      setLoading(false);

      navigate("/auth/login");
    } catch (error) {
      setLoading(false);

      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ general: "An error occurred. Please try again." });
      }
    }
  }

  return (
    <div className='container'>
      <h2>Register</h2>
      {errors.general && (
        <div className='alert alert-danger'>{errors.general}</div>
      )}

      <form onSubmit={onSubmitForm}>
        <div className='mb-3'>
          <input
            type='text'
            placeholder='First Name'
            autoComplete='off'
            className='form-control'
            id='first_name'
            ref={first_name}
          />
        </div>
        <div className='mb-3'>
          <input
            type='text'
            placeholder='Last Name'
            autoComplete='off'
            className='form-control'
            id='last_name'
            ref={last_name}
          />
        </div>
        <div className='mb-3'>
          <input
            type='text'
            placeholder='Ethereum Wallet Address'
            autoComplete='off'
            className='form-control'
            id='ethereum_wallet_address'
            ref={ethereumWalletAddress}
          />
          {errors.ethereum_wallet_address && (
            <div className='alert alert-danger'>
              {errors.ethereum_wallet_address}
            </div>
          )}
        </div>
        <div className='mb-3'>
          <input
            type='email'
            placeholder='Email'
            autoComplete='off'
            className='form-control'
            id='email'
            ref={email}
          />
          {errors.email && (
            <div className='alert alert-danger'>{errors.email}</div>
          )}
        </div>
        <div className='mb-3'>
          <input
            type='password'
            placeholder='Password'
            autoComplete='off'
            className='form-control'
            id='password'
            ref={password}
          />
        </div>
        <div className='mb-3'>
          <input
            type='password'
            placeholder='Confirm Password'
            autoComplete='off'
            className='form-control'
            id='passwordConfirmation'
            ref={password2}
          />
        </div>
        <div className='mb-3'>
          <button disabled={loading} className='btn btn-success' type='submit'>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
