
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

import { useEffect } from "react";

const BASE_API_URL = 'https://deckofcardsapi.com/api/deck';

function DrawCardApp({numDecks=1}) {
  const [deckId, setDeckId] = useState(null);
  const [remaining, setRemaining] = useState(null);
  const [drawn, setDrawn] = useState([]);

    useEffect(function getDeckFromAPI() {
      async function getDeck() {
        let deckResult = await axios.get(`${BASE_API_URL}/new/shuffle/?deck_count=${numDecks}`);
        setDeckId(deckResult.data.deck_id);
        setRemaining(deckResult.data.remaining);
      }
      getDeck();
    }, []);

    useEffect(function drawCardFromAPI() {
      async function drawCard() {
        let cardResult = await axios.get(`${BASE_API_URL}/${deckId}/draw/?count=1`);
        setDrawn(cards => [...cards, cardResult.data.cards[0]]);
      }
      drawCard();
    }, [remaining]);

    function handleClick(evt) {
      setRemaining(remaining => remaining - 1);
    }

    return (
    <div className="DrawCardApp">
      <button 
        className="DrawCardApp-button"
        onClick={handleClick}>GIMME A CARD!!!!!</button>
      <div className="DrawCardApp-deck">
        <Deck drawn={drawn}/>
      </div>
    </div>);
}

export default DrawCardApp;