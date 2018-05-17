class Ball {
    constructor(game) {
        // paraméterekből beállítás
        this.game = game;

        // labda HTML elem létrehozása
        this.element = document.createElement('div');
        this.element.className = 'ball';

        // játékhoz csatolás
        this.game.element.appendChild(this.element);

        // pozicionálás
        this.SetBottomDistance(
            this.game.element.clientHeight - this.GetHeight()
        );
        this.SetLeftDistance(this.GetRandomXPosition());

        // zuhanás megkezdése
        this.Fall();
    }

    // zuhanás

    Fall() {
        if (this.destroyed) {
            return;
        }

        // megsemmisítés ha leesett
        if (this.GetBottomDistance() <= this.game.box.GetHeight()) {
            this.TriggerFellInLine();
        }

        // megsemmisítés ha leesett
        if (this.GetBottomDistance() <= 0) {
            this.Destroy();
            this.TriggerFellOff();
            return;
        }

        // mozgás
        this.SetBottomDistance(this.GetBottomDistance() - 1);

        // mozgás időzítése
        setTimeout(() => {
            this.Fall();
        }, 5);
    }

    // alsó távolság

    GetBottomDistance() {
        return +this.element.style.bottom.replace('px', '');
    }

    SetBottomDistance(distance) {
        this.element.style.bottom = distance + 'px';
    }

    // bal távolság

    GetLeftDistance() {
        return +this.element.style.left.replace('px', '');
    }

    SetLeftDistance(distance) {
        this.element.style.left = distance + 'px';
    }

    // szélesség és magassaág

    GetWidth() {
        return this.element.clientWidth;
    }

    GetHeight() {
        return this.element.clientHeight;
    }

    // pozicionálás

    GetRandomXPosition() {
        let gameWidth = this.game.element.clientWidth,
            ballWidth = this.GetWidth();
        return Math.round(Math.random() * (gameWidth - ballWidth));
    }

    Destroy() {
        this.element.style.display = 'none';
        this.destroyed = true;
    }

    // események

    TriggerFellInLine() {
        window.dispatchEvent(
            new CustomEvent('ball/fellInLine', {
                detail: this
            })
        );
    }

    TriggerFellOff() {
        window.dispatchEvent(new Event('ball/fellOff'));
    }
}
