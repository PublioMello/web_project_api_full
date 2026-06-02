import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import api from "../utils/api";
import Register from "./Register/Register";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "./Login/Login";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip/InfoTooltip";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    api.getUserInfo().then(setCurrentUser);
    api.getInitialCards().then(setCards);
  }, []);

  async function handleRegister({ email, password }) {
    try {
      await auth.register({ email, password });
      setIsSuccess(true);
      setIsInfoTooltipOpen(true);
      navigate("/signin");
    } catch (err) {
      console.log(err);
      setIsSuccess(false);
      setIsInfoTooltipOpen(true);
    }
  }

  async function handleLogin({ email, password }) {
    try {
      const data = await auth.authorize({ email, password });

      if (data.token) {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("email", email);
        setIsLoggedIn(true);
        setUserEmail(email);

        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }

    auth
      .checkToken(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setUserEmail(data.data.email);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handleUpdateUser(data) {
    const newData = await api.editarDados(data);
    setCurrentUser(newData);
  }

  async function handleUpdateAvatar(data) {
    try {
      const updatedUser = await api.editProfilePicture(data);
      setCurrentUser(updatedUser);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCardLike(card) {
    try {
      const isLiked = card.isLiked;

      const updatedCard = !isLiked
        ? await api.addLike(card._id)
        : await api.removeLike(card._id);

      setCards((prevCards) =>
        prevCards.map((c) => (c._id === card._id ? updatedCard : c)),
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteCard(id) {
    try {
      await api.deleteCard(id);

      setCards((prevCards) => prevCards.filter((card) => card._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddPlaceSubmit(data) {
    try {
      const newCard = await api.addNewCard(data);
      console.log(newCard);

      setCards((prevCards) => [
        {
          ...newCard,
          isLiked:
            newCard.likes?.some((user) => user._id === currentUser._id) ||
            false,
        },
        ...prevCards,
      ]);

      return newCard;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="signup"
            element={<Register handleRegister={handleRegister} />}
          />

          <Route path="signin" element={<Login handleLogin={handleLogin} />} />

          <Route
            index
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCard}
                  onAddPlaceSubmit={handleAddPlaceSubmit}
                />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isSuccess={isSuccess}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}
export default App;
