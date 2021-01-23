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
  return (
    <div className="Deck">
      {drawn.map(c => <Card key={c.image} card={c} />)}
    </div>
  )
}

export default Deck;