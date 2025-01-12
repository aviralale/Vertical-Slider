### The slider object contains all the properties and methods to manage the slider functionality.

#### Properties:

    track: Refers to the .slider-track element, which holds all the cards.
    cards: An array to store the card elements.
    isDragging: Tracks whether the user is currently dragging the slider.
    startY: The initial vertical position when dragging begins.
    currentTranslate: Tracks the current vertical position of the slider.
    prevTranslate: Tracks the last vertical position of the slider.
    currentIndex: The index of the currently active card.
    cardHeight: The height of each card, used to calculate the scroll positions.

#### Methods

1. init()

   Initializes the slider by:
   Creating and appending 5 cards.
   Storing the height of a single card for later calculations.
   Updating the visual state to highlight the active card.
   Adding event listeners for interaction.

2. createCard()

   Dynamically generates a card element.
   Each card contains:
   A skeleton-1 for a placeholder image.
   A skeleton-2 with an avatar and text placeholders.

3. updateActiveCard()

   Updates the visual state of the cards:
   Highlights the card at currentIndex using the .active class.
   Ensures only the active card is scaled and fully visible.

4. addEventListeners()

   Adds event listeners for mouse and touch interactions:
   mousedown/touchstart: Starts dragging.
   mousemove/touchmove: Handles dragging motion.
   mouseup/touchend: Stops dragging and updates the slider.

5. startDragging(e)

   Begins the dragging operation by:
   Setting isDragging to true.
   Storing the starting vertical position (startY).
   Adding the dragging class for visual feedback.

6. drag(e)

   Handles the drag motion:
   Calculates the vertical distance moved (diff) based on the current and start positions.
   Updates currentTranslate to move the slider visually.

7. stopDragging()

   Ends the dragging operation:
   Calculates how much the slider moved during the drag (movedBy).
   Updates the currentIndex based on the drag direction:
   If dragged down (positive movedBy), the slider moves to the previous card.
   If dragged up (negative movedBy), the slider moves to the next card.
   Loops the slider:
   If the first card is active and dragged down, move to the last card.
   If the last card is active and dragged up, move to the first card.
   Updates currentTranslate and prevTranslate to snap the slider to the new active card.
   Calls updateActiveCard() to visually update the active card.
