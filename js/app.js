var allowedEnemyRows = {
    'top': 60,
    'middle': 145,
    'bottom': 230
}

var Enemy = function (row, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.initialX = -80;
    this.initialY = allowedEnemyRows[row];
    this.x = this.initialX;
    this.y = this.initialY;
    this.speed = speed;
}

Enemy.prototype.reset = function () {
    this.x = this.initialX;
}

Enemy.prototype.update = function (dt) {
    setInterval(() => {
        if (player.gameIsEnd) return;

        if (this.x > 500) {
            this.reset();
            return;
        }

        if (Math.abs(player.y - this.y) < 40 && Math.abs(player.x - this.x) < 80) {
            player.gameIsEnd = true;
            setTimeout(() => player.reset(), 1000);
            return;
        }

        this.x = this.x + this.speed;
    }, 2000 / dt);
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.initialX = 200;
    this.initialY = 400;
    this.x = this.initialX;
    this.y = this.initialY;
    this.gameIsEnd = false;
}

Player.prototype.reset = function () {
    this.x = this.initialX;
    this.y = this.initialY;
    this.gameIsEnd = false;

    allEnemies.forEach((enemy) => {
        enemy.reset();
    })
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function () {

};

Player.prototype.handleInput = function (key) {
    if (this.gameIsEnd) return;

    if (key === 'up' && this.y >= 72) {
        this.y -= 82;

        if (this.y < 0) {
            this.gameIsEnd = true;

            setTimeout(() => {
                this.reset();
            }, 1000);

            return;
        }
    }

    if (key === 'down' && this.y < 400) {
        this.y += 82;
        return;
    }

    if (key === 'left' && this.x > 0) {
        this.x -= 100;
        return;
    }

    if (key === 'right' && this.x < 400) {
        this.x += 100;
        return;
    }
}

var allEnemies = [
    new Enemy('top', 1),
    new Enemy('middle', 1.1),
    new Enemy('bottom', 0.5)
];

var player = new Player();


document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
