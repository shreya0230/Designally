import axios from "axios";
import { useEffect, useState } from 'react';
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Posts from "../../components/posts/Posts";
import "./home.css";
import { useLocation } from "react-router";
const apiUrl = process.env.REACT_APP_API_URL;


export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  
  useEffect(() => {
    const fetchPosts = async ()=>{
      const res = await axios.get(`${apiUrl}/api/posts/` + search);
      setPosts(res.data);
    }
    fetchPosts();
  },[search])
  
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts = {posts} />
        <Sidebar />
      </div>
      
    </>
  );
}