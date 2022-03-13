/************************** Understanding snake algorithm ******************************/
/*
    We need to consider the canvas as a grid.
    Each grid cell has the size of a rect_size
*/

/************************** Global variables *******************************************/
let s;
let rect_size = 20;
let f;
let col;
let row;
let oldKeyCode;

/**************************** Creating a snake class ***********************************/
class Snake {
    constructor(x, y, xmove, ymove, speed) {
        this.x = x;
        this.y = y;
        this.xmove = xmove;
        this.ymove = ymove;
        this.speed = speed;
        this.tail = [];
        this.total = 0;
    }

    /**
     * checks if the snake ate the food
     * @returns true if the snake and the food are 3 px close to each other
     */
    eat() {

        var d = dist(this.x, this.y, f.x, f.y); //Calculating the distance between the food and the snake

        if (d < 3) {
            this.total++;
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Changing snake directions
     * @param {*} x_t : x value that will be added to the snake speed in relation to the x achse
     * @param {*} y_t : y value that will be added to the snake speed in relation to the y achse
     */
    move(x_t, y_t) {
        this.xmove = x_t;
        this.ymove = y_t;
    }

    reset() {
        this.total = 0;
        this.tail = [];
        this.x = 0;
        this.y = 0;
    }

    isDead() {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 3) {
                this.reset();
            }
        }
    }

    /**
     * Updating the x and y of the snake object according to the move method 
     */
    update() {
        //Shifting the tail when the total is bigger than 1
        if (this.total === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }

        // Before changing the new coordinates, save the position into the 
        // tail since the snake ate a piece of food
        if (this.total > 0)
            this.tail[this.total - 1] = createVector(this.x, this.y);

        this.x = this.x + this.xmove * this.speed;
        this.y = this.y + this.ymove * this.speed;

        this.x = constrain(this.x, 0, width - rect_size);  /* Because of the rectangle size we need to substract rect_size to the width  */
        this.y = constrain(this.y, 0, height - rect_size); /* Because of the rectangle size we need to substract rect_size to the height */
    }

    /** 
     * Showing the snake object according to x and y and rect_size
     */
    show() {
        fill(255);
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, rect_size, rect_size);
        }

        fill(0, 0, 255);
        rect(this.x, this.y, rect_size, rect_size);
    }
}

/**************************** Creating a food class *************************************/
class food {
    constructor() {
        this.x = int(random(col)) * rect_size;
        this.y = int(random(row)) * rect_size;
    }

    /**
     * Set new position for food
     */
    setNewFood() {
        this.x = int(random(col)) * rect_size;
        this.y = int(random(row)) * rect_size;
    }

    /** 
     * Showing the snake object according to x and y and rect_size
     */
    show() {
        fill(255);
        rect(this.x, this.y, rect_size, rect_size);
    }
}



/**************************** Binding P5.js functions ***********************************/

/**
 * Setup the canvas
 * Setup the snake object
 * Setup the framerate
 */
function setup() {
    var cnv = createCanvas(500, 500);
    cnv.parent('snake-gamestyle');
    col = int(width / rect_size);
    row = int(height / rect_size);

    s = new Snake(0, 0, 0, 0, 1);
    f = new food();

    frameRate(15);
}

/**
 * This run in a while loop indefinitely
 */
function draw() {
    background(60);
    s.show(); //show snake
    f.show(); //show food
    s.update();
    s.isDead();


    if (s.eat(food))
        f.setNewFood();

}

/** 
 * Moving the snake to the right direction when 
 * pressing on the arrow keys
 * @note : the snake cannot go backwards when the size of it is bigger than 1
 */
function keyPressed() {

    if (keyCode == UP_ARROW) {

        if (s.total > 1 && oldKeyCode === DOWN_ARROW) {
            console.log("Unable to go up in this case")
            oldKeyCode = DOWN_ARROW;
        }
        else {
            s.move(0, -rect_size);
            oldKeyCode = UP_ARROW;
        }
    } else if (keyCode == DOWN_ARROW) {
        if (s.total > 1 && oldKeyCode === UP_ARROW) {
            console.log("Unable to go down in this case")
            oldKeyCode = UP_ARROW;
        }
        else {
            s.move(0, rect_size);
            oldKeyCode = DOWN_ARROW;
        }
    } else if (keyCode == RIGHT_ARROW) {

        if (s.total > 1 && oldKeyCode === 37) {
            console.log("Unable to go right in this case")
            oldKeyCode = 37;
        }
        else {
            s.move(rect_size, 0);
            oldKeyCode = RIGHT_ARROW;
            console.log(oldKeyCode);
        }
    } else if (keyCode == LEFT_ARROW) {
        if (s.total > 1 && oldKeyCode === RIGHT_ARROW) {
            console.log("Unable to go left in this case")
            oldKeyCode = RIGHT_ARROW;
        } else {
            s.move(-rect_size, 0);
            oldKeyCode = LEFT_ARROW;
        }
    }
}