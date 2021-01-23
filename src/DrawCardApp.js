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
 * - shouldDraw: true/false
 * 
 * App -> DrawCardApp -> Deck
 */

function DrawCardApp({ numDecks = 1 }) {
  console.log("DrawCardApp rendered");
  const [deckId, setDeckId] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [shouldDraw, setShouldDraw] = useState(false);
  const [shouldShuffle, setShouldShuffle] = useState(false);

  useEffect(function drawCardFromAPI() {
    console.log("Drawing Card from API ran");
    async function drawCard() {
      let cardResult = await axios.get(`${BASE_API_URL}/${deckId}/draw/?count=1`);
      console.log("got cardResult");
      setDrawn(cards => [...cards, cardResult.data.cards[0]]);
      setShouldDraw(false);
    }
    if (!shouldDraw) return;
    drawCard();
  }, [shouldDraw, deckId]);

  useEffect(function getDeckFromAPI() {
    console.log("getDeck from API ran");
    async function getDeck() {
      let deckResult = await axios.get(`${BASE_API_URL}/new/shuffle/?deck_count=${numDecks}`);
      console.log("Got deck Result");
      setDeckId(deckResult.data.deck_id);
      setRemaining(deckResult.data.remaining);
    }
    getDeck();
  }, [numDecks]);

  useEffect(function shuffleDeckFromAPI() {
    console.log("shuffleDeck from API ran");
    async function shuffleDeck() {
      let shuffleResult = await axios.get(`${BASE_API_URL}/${deckId}/shuffle`);
      console.log("Got shuffled deck result");
      setDrawn([]);
      setRemaining(shuffleResult.data.remaining);
      setShouldShuffle(false);
    }
    if (!shouldShuffle) return;
    shuffleDeck();
  }, [deckId, shouldShuffle]);


  function handleDraw(evt) {
    setRemaining(remaining => remaining - 1);
    setShouldDraw(true);
  }

  function handleShuffle(evt) {
    if (shouldShuffle) return;
    setShouldShuffle(true);
  }

  function renderDeckOrMessage() {
    if (drawn.length === 0) {
      return <h3 className="DrawCardApp-loading">Go ahead and get a card!</h3>;
    } else if (remaining === 0) {
      return <h3 className="DrawCardApp-noCards">Error: no cards remaining!</h3>;
    } else {
      return <Deck drawn={drawn} />;
    }
  }

  function renderRenderDrawButton() {
    return remaining > 0
      ? <button
        className="DrawCardApp-drawButton"
        onClick={handleDraw}>GIMME A CARD!!!!!
                  </button>
      : ''
  }

  function renderShuffleButton() {

    return remaining > 0
      ? <button
        className="DrawCardApp-shuffleButton"
        onClick={handleShuffle}>SHUFFLE DECK
                  </button>
      : ''
  }

  return (
    <div className="DrawCardApp">
      {renderRenderDrawButton()}
      {renderShuffleButton()}
      <div className="DrawCardApp-deck">
        {renderDeckOrMessage()}
      </div>
    </div>);
}

export default DrawCardApp;