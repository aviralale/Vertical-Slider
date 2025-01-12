const slider = {
  track: document.querySelector(".slider-track"),
  cards: [],
  isDragging: false,
  startY: 0,
  currentTranslate: 0,
  prevTranslate: 0,
  currentIndex: 0,
  cardHeight: 0,

  init() {
    for (let i = 0; i < 5; i++) {
      const card = this.createCard();
      this.cards.push(card);
      this.track.appendChild(card);
    }

    this.cardHeight = this.cards[0].offsetHeight + 20;
    this.updateActiveCard();
    this.addEventListeners();
  },

  createCard() {
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
    this.cards.forEach((card, index) => {
      card.classList.toggle("active", index === this.currentIndex);
    });
  },

  addEventListeners() {
    this.track.addEventListener("mousedown", (e) => this.startDragging(e));
    window.addEventListener("mousemove", (e) => this.drag(e));
    window.addEventListener("mouseup", () => this.stopDragging());

    this.track.addEventListener("touchstart", (e) => this.startDragging(e));
    window.addEventListener("touchmove", (e) => this.drag(e));
    window.addEventListener("touchend", () => this.stopDragging());
  },

  startDragging(e) {
    this.isDragging = true;
    this.startY = e.type === "mousedown" ? e.clientY : e.touches[0].clientY;
    this.track.classList.add("dragging");
  },

  drag(e) {
    if (!this.isDragging) return;

    const currentY = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;
    const diff = currentY - this.startY;
    this.currentTranslate = this.prevTranslate + diff;

    this.track.style.transform = `translateY(${this.currentTranslate}px)`;
  },
  stopDragging() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.track.classList.remove("dragging");

    const movedBy = this.currentTranslate - this.prevTranslate;
    if (Math.abs(movedBy) > 50) {
      if (movedBy > 0) {
        this.currentIndex =
          this.currentIndex === 0
            ? this.cards.length - 1
            : this.currentIndex - 1;
      } else if (movedBy < 0) {
        this.currentIndex =
          this.currentIndex === this.cards.length - 1
            ? 0
            : this.currentIndex + 1;
      }
    }
    this.currentTranslate = -(this.currentIndex * this.cardHeight);
    this.prevTranslate = this.currentTranslate;
    this.track.style.transform = `translateY(${this.currentTranslate}px)`;
    this.updateActiveCard();
  },
};

document.addEventListener("DOMContentLoaded", () => slider.init());
