class Card {
    constructor(value, element) {
        this.value = value;
        this.element = element;
        this.color = 'black';
        this.resolved = false;
        this.UpdateColor();
        this.blocked = 'false';

        this.element.addEventListener('click', () => {
            this.OnClick();
        });

    }

    OnClick() {
        this.ToggleColor();
        this.TriggerCardClick();
    }

    ToggleColor() {
        this.color = (this.color == 'black') ? 'white' : 'black';
        this.UpdateColor();
    }

    UpdateColor() {
        this.element.style.backgroundColor = this.color;
    }

    TriggerCardClick() {
        let event = new CustomEvent('cardClick', {
            detail: this
        });
        window.dispatchEvent(event);
    }

    SetResolved() {
        this.resolved = true;
        this.element.style.visibility = 'hidden';
    }
}
