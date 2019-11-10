import React, { useState } from "react";
import { useSnackbar } from "notistack";

// create the global state context
export const CardsContext = React.createContext({});
const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST;

export function CardsProvider({ children }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [inputRef, setInputRef] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const globalState = {
    loading,
    posting,
    cards,
    inputRef,
    updateRef: ref => {
      setInputRef(ref);
    },
    fetchCards: async () => {
      try {
        setLoading(true);
        const res = await fetch(`${REACT_APP_API_HOST}/cards`);
        const { result } = await res.json();
        setCards(result);
        setLoading(false);
      } catch (error) {
        console.log("error", error.message);
      }
    },
    deleteCards: async () => {
      try {
        setLoading(true);
        const res = await fetch(`${REACT_APP_API_HOST}/cards`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const { result } = await res.json();
        setCards(result);
        setLoading(false);
      } catch (error) {
        console.log("error", error.message);
      }
    },
    addNewCard: async ({ name, number, limit }) => {
      setPosting(true);
      const res = await fetch(`${REACT_APP_API_HOST}/cards`, {
        method: "POST",
        body: JSON.stringify({ name, number, limit }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const { result, error } = await res.json();

      if (res.status === 200) {
        setCards([{ ...result }, ...cards]);
        enqueueSnackbar("The new card has been inserted successfully !", {
          variant: "success"
        });
      }

      if ((res.status === 422 || res.status === 400) && error) {
        const { message } = error;
        enqueueSnackbar(message, {
          variant: "error"
        });
      }
      setPosting(false);
    }
  };

  return (
    <CardsContext.Provider value={globalState}>
      {children}
    </CardsContext.Provider>
  );
}

export const CardsConsumer = CardsContext.Consumer;
