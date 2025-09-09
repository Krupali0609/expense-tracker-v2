import React from 'react'
import "./Home.css"
import { useNavigate } from 'react-router-dom'

const Home = () => {
const navigate=useNavigate()

  return (
    <div className="home-container"> 
      <div className="home-box">

        {/* Title */}
        <h1 className="home-title">Welcome to Group Expense Tracker</h1>

        {/* Two-column layout */}
        <div className="home-content">
          {/* Left side - Image */}
          <div className="home-left">
            <img 
              src="https://www.shutterstock.com/shutterstock/photos/2382150379/display_1500/stock-vector-finance-control-hand-drawn-composition-expense-tracker-in-mobile-bank-account-smartphone-app-with-2382150379.jpg" 
              alt="Sample"
              className="home-image"
            />
          </div>

          {/* Right side - Paragraph & Button */}
          <div className="home-right">
            <p className="home-description">
              This is a simple React application with a modern blue theme.
              Explore more features by clicking the button below!
            </p>
            <button className="home-button" onClick={()=>navigate("/addmember")}>Get Started</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
