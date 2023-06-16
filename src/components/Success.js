import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './success.css'



const Success = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    
    const serverUrl = process.env.REACT_APP_SERVER_URL
    
    useEffect(() => {
        if (!state) {
            navigate('/')
        }       
    })

    const [registrationData, setRegistrationData] = useState({
      payer:'',
      email:'',
      phoneNumber:'',
      numberOfPeople: null || (state.response.amount / 2500),
      owners:{}, //name of person being paid for
      conference:'',
      association:'',
      church:''
    }) ;

    let num = registrationData.numberOfPeople
    let inputArray= [num];
    let update
    while(num > 1) {
      update = num - 1
      inputArray.push(update)
      num--;
      
    }
    // console.log(inputArray)
    //console.log(process.env)
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        const response = await axios.post(serverUrl, registrationData);
        console.log(response);
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    };
  
    
  return (
    state && 
    <div className='container'>

        <form onSubmit={handleSubmit}>
          <h1>Registration Form</h1>
          <div className='row'>
            <label htmlFor="payer">Payer's Full Name</label>
            <input 
              id='payer' 
              name='payer' 
              type='text'
              value={registrationData.payer} 
              onChange={(e) => { setRegistrationData({...registrationData, payer: e.target.value})}}
              required
            />
          </div>


          <div className='row'>
            <label htmlFor="email">E-mail Address of Payer</label>
            <input 
              id='email' 
              name='email' 
              type='email'
              value={registrationData.email} 
              onChange={(e) => { setRegistrationData({...registrationData, email: e.target.value})}}
              required
            />
          </div>

          <div className='row'>
            <label htmlFor="phoneNumber">Phone Number of Payer</label>
            <input 
              id='phoneNumber' 
              name='phoneNumber' 
              type='number'
              value={registrationData.phoneNumber} 
              onChange={(e) => { setRegistrationData({...registrationData, phoneNumber: e.target.value})}}
              required
            />
          </div>

          
          <h3>Number of People you paid for:  {registrationData.numberOfPeople}</h3>
          <p>Input the Name(s) of Peoples Paid for</p>
        

          {
            
            inputArray.map(function(item){
              // console.log('test');
              console.log(registrationData.owners)
              return (
                <div key={item} className='row'>
                   <input 
                      key={item}
                      id='person' 
                      name='owners' 
                      type='text'
                      value={registrationData.owners[item]} 
                      onChange={(e) => { setRegistrationData( {...registrationData, owners: {...registrationData.owners, [item]: e.target.value}} ) }}
                      required
                      placeholder={ `Full Name ${item}`}
                    />
                </div>
                )
            })

            
          }

          <div className='row'>
            <label htmlFor="conference">Conference</label>
            <input 
              id='conference' 
              name='conference' 
              type='text'
              value={registrationData.conference} 
              onChange={(e) => { setRegistrationData({...registrationData, conference: e.target.value})}}
              required
            />
          </div>

          <div className='row'>
            <label htmlFor="association">Association</label>
            <input 
              id='association' 
              name='association' 
              type='text'
              value={registrationData.association} 
              onChange={(e) => { setRegistrationData({...registrationData, association: e.target.value})}}
              required
            />
          </div>

          <div className='row'>
            <label htmlFor="church">Church</label>
            <input 
              id='church' 
              name='church' 
              type='text'
              value={registrationData.church} 
              onChange={(e) => { setRegistrationData({...registrationData, church: e.target.value})}}
              required
            />
          </div>

          <div className='row'>
            <input type='submit' value='Register' />
          </div>
          

        </form>
    </div> 
  )
}

export default Success