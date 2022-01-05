import { useReducer } from "react";


import Head from 'next/head'
import Image from 'next/image'
import Ripples from 'react-ripples'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import gitHubPic from '../public/GitHub.png'

const initialState = {
  food: null,
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'FIND_FOOD_CLICKED':
      return { ...state, loading: true};
    case 'FOOD_FETCHED':
      return { ...state, food: action.food, loading: false };
    case 'FOOD_FETCH_ERROR':
      return { ...state, loading: false };
    case 'RETURN_MENU':
      return { ...state, loading: true};
  }
}


export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const findFood = async () => {
    dispatch({type: 'FIND_FOOD_CLICKED'});

    let response = await fetch('/api');
    try {
      if (response.ok) {
        const result = await response.json();
        dispatch({type: 'FOOD_FETCHED', food: result.foodType});
      } else {
         toast.error('Error while finding the food. Please retry!', { theme: "colored" });
        dispatch({type: 'FOOD_FETCH_ERROR'});
      }
    } catch (e) {
       toast.error('Error while finding the food. Please retry!', { theme: "colored" });
      dispatch({type: 'FOOD_FETCH_ERROR'});
    }
  }

  return (
    <div className="container">
      <div className={`loading ${state.loading ? '' : 'hide'}`}>
        <div className="loading-text"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
      </div>
      <Head>
        <title>What to eat?</title>
        <meta name="title" content="What to eat?" />
        <meta name="description" content="Application that makes the hard decision for us and decide where to eat for the user. It also gives information on the some restaurant you could go eating." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <main className="main">
        <div className="content"> 
          <h1 className="title">
            What to eat tonight ? 
          </h1>
          
          { state.food ? 
            (
              <>
                <h2 className="food-title"> 
                  {state.food}
                </h2>
                <p className="description">
                  Not satisfied ? You can retry by clicking the button below.
                </p>
              </>
            )
          :
          (
          <p className="description">
            Ask no more we resolve that issue for you by clicking on the button below.
          </p>
          )}


          <div className="buttons">
            <Ripples>
              <button className="button ripple" onClick={findFood}>
                Find me what food to eat!!!
              </button>
            </Ripples>
          </div>
        </div>
      </main>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
      <footer className="footer">
        <a
          href="https://github.com/whassa"
          target="_blank"
          rel="noopener noreferrer"
        >
         <span className="footer-text">
           Made by whassa
         </span>
         <Image src={gitHubPic} alt="Git Hub Logo"/>
        </a>
      </footer>
    </div>
  )
}
