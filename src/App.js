// import logo from "./logo.svg";
import "./App.css";
import "./components/css/common.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import FoodPost from "./components/FoodPost";
import FoodFeed from "./components/FoodFeed";
import RequesPage from "./components/RequestPage";
import NotFoundPage from "./components/NotFoundPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import {AuthProvider} from './AuthContext';

function App() {
    return (

        <Router>
            <AuthProvider>

                <div className="App">
                    <Navbar/>
                    <div>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/food-post" element={<FoodPost/>}/>
                            <Route path="/food-post/:postId" element={<FoodPost/>}/>
                            <Route path="/food-feed" element={<FoodFeed/>}/>
                            <Route path="/request" element={<RequesPage />} />
                            <Route path="/login-page" element={<Login/>}/>
                            <Route path="/admin" element={<AdminDashboard/>}/>
                            <Route path="*" element={<NotFoundPage/>}/>
                        </Routes>
                    </div>
                </div>
            </AuthProvider>
        </Router>


    );
}

export default App;
