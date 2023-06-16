import React, { useState } from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { useNavigate } from 'react-router-dom';
import './home.css';


const Home = () => {
    const [value, setValue] = useState(1)
    const navigate = useNavigate();
    const handleIncrement = () => {
        if(value >= 20) {
            setValue(prevState => prevState -1)
        }
        setValue(prevState => prevState + 1)
    }

    const handleDecrement = () => {
        if (value <= 1){
            setValue(prevState => prevState +1)
        }
        setValue(prevState => prevState - 1)
    }
    const apiKey = process.env.REACT_APP_PUBLIC_KEY
    const config = {
        public_key: apiKey,
        tx_ref: Date.now(),
        amount: 2500 * value,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email: 'user@gmail.com',
          phone_number: '070********',
          name: 'john doe',
        },
        customizations: {
          title: "Refreshing'23",
          description: 'Payment for Refreshing 2023',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };
    
      const fwConfig = {
        ...config,
        text: 'Pay with Flutterwave!',
        callback: (response) => {
           console.log(response);
           if (response.status === 'completed') {
            navigate('/success', {
                state:{
                    response
                }
            }
            )
           }
          closePaymentModal() // this will close the modal programmatically
        },
        onClose: () => {},
      };
  return (
    <div className='container'>
        <h1>Welcome To Refreshing 2023</h1>
        <h2 className='h2'>Register Here</h2>

        <div className='increment'>
            <button onClick={handleIncrement}>+</button>
            <p>{value}</p>
            <button onClick={handleDecrement}>-</button>
        </div>

        <h2>Quantity: {value}</h2>
        <h3>Price: {`${2500 * value} Naira`}</h3>

        <FlutterWaveButton {...fwConfig} className='flutterbutton'/>
        

    </div>
  )
}

export default Home