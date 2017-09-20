const CardReducer = (card = {
  name: 'Busy',
  title: 'Card',
  link: 'Busy@BusyCard.busyness'
}, action) => {
  switch (action.type) {
    case CARD_UPDATE:
      return card = Object.assign(card, action.payload);
    default:
      return card
  }
};

export default CardReducer;