import axios from "axios";
import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import "./sidebar.css";
import avatar from "../../images/avatar.svg";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => { 
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  
  return (
    <div className="sticky sidebar">
      <div className="sidebarItem">
        <img
              className="topImg"
              src={avatar}
              alt=""
            />
        <p>
        “Good design is actually a lot harder to notice than poor design,
         in part because good designs fit our needs so well that the
         design is invisible,” <br/><br/>
         <i>~ Don Norman</i>
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">EXPLORE CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}