const slider = {
  track: document.querySelector(".slider-track"), // Reference to the track element containing cards
  cards: [], // Array to hold card elements
  isDragging: false, // Flag to check if the user is dragging
  startY: 0, // Y-coordinate where dragging starts
  currentTranslate: 0, // Current translation value for the track
  prevTranslate: 0, // Last translation value before the current drag
  currentIndex: 0, // Index of the currently active card
  cardHeight: 0, // Height of each card including margin

  init() {
    // Initialize slider: create cards, calculate card height, and set up event listeners
    for (let i = 0; i < 5; i++) {
      const card = this.createCard();
      this.cards.push(card); // Store each card in the cards array
      this.track.appendChild(card); // Add the card to the track
    }

    // Calculate the height of a single card including its margin (20px in this case)
    this.cardHeight = this.cards[0].offsetHeight + 20;

    // Highlight the active card (first card initially)
    this.updateActiveCard();

    // Attach event listeners for dragging functionality
    this.addEventListeners();
  },

  createCard() {
    // Dynamically create a card element with skeleton placeholders
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <div class="skeleton skeleton-1"></div>
                    <div class="skeleton-2">
                        <div class="skeleton avatar-skeleton"></div>
                        <div class="text-skeleton">
                            <div class="skeleton text-skeleton-1"></div>
                            <div class="skeleton text-skeleton-2"></div>
                        </div>
                    </div>
    `;
    return card;
  },

  updateActiveCard() {
    // Update the active card based on the current index
    this.cards.forEach((card, index) => {
      card.classList.toggle("active", index === this.currentIndex);
    });
  },

  addEventListeners() {
    // Add mouse and touch event listeners for dragging
    this.track.addEventListener("mousedown", (e) => this.startDragging(e));
    window.addEventListener("mousemove", (e) => this.drag(e));
    window.addEventListener("mouseup", () => this.stopDragging());

    this.track.addEventListener("touchstart", (e) => this.startDragging(e));
    window.addEventListener("touchmove", (e) => this.drag(e));
    window.addEventListener("touchend", () => this.stopDragging());
  },

  startDragging(e) {
    // Start dragging and record the initial Y-coordinate
    this.isDragging = true;
    this.startY = e.type === "mousedown" ? e.clientY : e.touches[0].clientY;
    this.track.classList.add("dragging"); // Add class to indicate dragging state
  },

  drag(e) {
    // Handle dragging logic
    if (!this.isDragging) return; // Ignore if not in dragging mode

    // Get the current Y-coordinate based on mouse or touch input
    const currentY = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;

    // Calculate the difference in Y-coordinates
    const diff = currentY - this.startY;

    // Update the current translation value for smooth dragging
    this.currentTranslate = this.prevTranslate + diff;

    // Apply the transformation to the track
    this.track.style.transform = `translateY(${this.currentTranslate}px)`;
  },

  stopDragging() {
    // Stop dragging and finalize the card position
    if (!this.isDragging) return;
    this.isDragging = false;
    this.track.classList.remove("dragging"); // Remove dragging class

    // Calculate how far the track was moved during dragging
    const movedBy = this.currentTranslate - this.prevTranslate;

    // If the movement exceeds a threshold (50px), determine the next card index
    if (Math.abs(movedBy) > 50) {
      if (movedBy > 0) {
        // User dragged downward: move to the previous card or loop to the last card
        this.currentIndex =
          this.currentIndex === 0
            ? this.cards.length - 1
            : this.currentIndex - 1;
      } else if (movedBy < 0) {
        // User dragged upward: move to the next card or loop to the first card
        this.currentIndex =
          this.currentIndex === this.cards.length - 1
            ? 0
            : this.currentIndex + 1;
      }
    }

    // Snap to the new card position based on the index
    this.currentTranslate = -(this.currentIndex * this.cardHeight);
    this.prevTranslate = this.currentTranslate; // Update the last translation value
    this.track.style.transform = `translateY(${this.currentTranslate}px)`; // Apply snapping

    // Update the active card to reflect the current index
    this.updateActiveCard();
  },
};

document.addEventListener("DOMContentLoaded", () => slider.init()); // Initialize the slider once the DOM is fully loaded
