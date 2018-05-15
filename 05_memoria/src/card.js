class Card {
    constructor(value, element) {
        this.element = element;
        this.color = 'black';
        console.log(element);
        this.element.addEventListener('click', () => {
            console.log(this);
            this.OnClick();
        });
        this.UpdateColor();
    }

    OnClick(){
        console.log('OnClick történt');
        this.ToggleColor();
        this.TriggerCardClick();
    }

    ToggleColor(){
        this.color = (this.color == 'black') ? 'white' : 'black';
        this.UpdateColor();
    }

    UpdateColor(){
        this.element.style.backgroundColor = this.color;
    }

    TriggerCardClick(){
        let event = new CustomEvent('cardClick', {detail:this});
        window.dispatchEvent(event);
    }
}