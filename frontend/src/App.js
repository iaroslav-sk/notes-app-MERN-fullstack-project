import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MyNotes } from "./screens/MyNotes/MyNotes";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/Notes/SingleNote";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/profile" element={<ProfileScreen />} exact />
          <Route path="/register" element={<RegisterScreen />} exact />
          <Route path="/createnote" element={<CreateNote />} exact />
          <Route path="/note/:id" element={<SingleNote />} exact />
          <Route path="/mynotes" element={<MyNotes search={search} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
