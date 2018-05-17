class Game {
    constructor(elementID, box) {
        // element
        this.element = document.getElementById(elementID);

        // box objektum
        this.box = box;

        // pontok
        this.points = 0;
        this.spanPointCounter = document.getElementById('pointCounter');
        this.UpdatePoints();

        // életek
        this.lifes = 3;
        this.spanLifeCounter = document.getElementById('lifeCounter');
        this.UpdateLifes();

        // feliratkozások
        window.addEventListener('ball/fellInLine', event => {
            this.OnBallFellInLine(event);
        });
        window.addEventListener('ball/fellOff', () => {
            this.OnBallFellOff();
        });

        // doboz létrehozása
        this.box = new Box('box', this);

        // labdák indítása
        this.GenerateBalls();
    }

    // labdák generálása

    GenerateBalls() {
        new Ball(this);

        setTimeout(() => {
            this.GenerateBalls();
        }, 1000);
    }

    // pontok

    IncreasePoints() {
        this.points++;
        this.UpdatePoints();
    }

    UpdatePoints() {
        this.spanPointCounter.innerText = this.points;
    }

    // életek

    DecraseLifes() {
        this.lifes--;
        this.UpdateLifes();
        if (this.IsGameOver()) {
            alert('Game over');
        }
    }

    UpdateLifes() {
        this.spanLifeCounter.innerText = this.lifes;
    }

    // eseménykezelők

    OnBallFellInLine(event) {
        // ha game over akkor nem futtatjuk
        if (this.IsGameOver()) {
            return;
        }

        // labda
        let ball = event.detail;

        // labda és doboz átfedés esetén
        if (this.HasIntersection(this.box, ball)) {
            // labda eltűntetése
            ball.Destroy();

            // pontszám növelése
            this.IncreasePoints();
        }
    }

    OnBallFellOff() {
        // ha game over akkor nem futtatjuk
        if (this.IsGameOver()) {
            return;
        }

        // élet csökkentése
        this.DecraseLifes();
    }

    // játék vége megállapítása

    IsGameOver() {
        return this.lifes == 0;
    }

    // doboz és labda átfedés megállapítása

    HasIntersection(box, ball) {
        // doboz bal és jobb oldalának megállapítása
        let boxLeft = box.GetLeftDistance(),
            boxRight = boxLeft + box.GetWidth(),
            ballLeft = ball.GetLeftDistance(),
            ballRight = ballLeft + ball.GetWidth();

        if (boxLeft <= ballLeft && ballLeft <= boxRight) {
            return true;
        }

        return false;
    }
}
