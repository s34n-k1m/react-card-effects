/** Renders single card in img element
 * 
 * props: 
 * - card: object containing card data {image, suit, code, value}
 * 
 * state: None
 * 
 * Deck -> Card
 */

function Card({card}) {
  const cardSrc = card.image;
  const altText = `The ${card.value} of ${card.suit}`;

  return (
    <img src={cardSrc} alt={altText} />
  )
}

export default Card;