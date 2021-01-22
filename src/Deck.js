import Card from "./Card";
import "./Deck.css";

/** Renders card components 
 * 
 * props: 
 * - drawn: array of objects describing cards [{image, suit, code, value}, ...]
 * 
 * state: None
 * 
 * DrawCardApp -> Deck -> Card
 */

function Deck({drawn}) {
  console.log("Deck rendered");
  // loop over all cards here
  return (
    <div className="Deck">
      <Card card={drawn[drawn.length - 1]} />
    </div>
  )
}

export default Deck;