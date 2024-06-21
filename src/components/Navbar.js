import React from "react"
import { Link } from "react-router-dom";

const Navbar = () => {
    return(
<div className="header  w-full  p-4 bg-red-500 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">NewsArea.com</h1>
        <div>
          <Link to="/" className="px-4 py-2 rounded-full bg-white text-red-500 mr-2">Home</Link>
          <Link to="/favorites" className="px-4 py-2 rounded-full bg-white text-red-500">Favorites</Link>
        </div>
</div>
    
)}
export default Navbar;