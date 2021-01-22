import { useState, useEffect } from "react";
import Deck from "./Deck";
import axios from "axios";
import "./DrawCardApp.css";

const BASE_API_URL = 'https://deckofcardsapi.com/api/deck';

/** Makes API requests to get deck of cards and draw a card from that deck
 * Prop:
 * - numDecks: number of decks, default 1
 * 
 * State:
 * - deckId
 * - remaining: number of cards not yet drawn from deck
 * - drawn: [{card}, ... ]
 * 
 * App -> DrawCardApp -> Deck
 */

function DrawCardApp({numDecks=1}) {
  console.log("DrawCardApp rendered");
  const [deckId, setDeckId] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [shouldDraw, setShouldDraw] = useState(false);
  
  useEffect(function drawCardFromAPI() {
    console.log("Drawing Card effect ran");
    async function drawCard() {
      let cardResult = await axios.get(`${BASE_API_URL}/${deckId}/draw/?count=1`);
      console.log("got cardResult");
      setDrawn(cards => [...cards, cardResult.data.cards[0]]);
      setShouldDraw(false);
    }
    if (!shouldDraw) return;
    drawCard();
  }, [remaining]);

  useEffect(function getDeckFromAPI() {
    console.log("getDeck ran");
    async function getDeck() {
      let deckResult = await axios.get(`${BASE_API_URL}/new/shuffle/?deck_count=${numDecks}`);
      console.log("Got deck Result");
      setDeckId(deckResult.data.deck_id);
      setRemaining(deckResult.data.remaining);
    }
    getDeck();
  }, []);


    function handleClick(evt) {
      setRemaining(remaining => remaining - 1);
      setShouldDraw(true);
    }

    function renderDeckOrMessage() {
      if (drawn.length === 0) {
        return <h3 className="DrawCardApp-loading">Go ahead and get a card!</h3>;
      } else if (remaining === 0) {
        return <h3 className="DrawCardApp-noCards">Error: no cards remaining!</h3>;
      } else {
        return <Deck drawn={drawn}/>;
      }
    }

    function renderButton() {
      return remaining <= 0 
                ? '' 
                : <button 
                      className="DrawCardApp-button"
                      onClick={handleClick}>GIMME A CARD!!!!!
                  </button>
    }

    return (
    <div className="DrawCardApp">
      {renderButton()}
      <div className="DrawCardApp-deck">
        {renderDeckOrMessage()}
      </div>
    </div>);
}

export default DrawCardApp;