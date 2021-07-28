//sqPerLine - количество клеток в строке/столбце
var sqPerLine = 50;
var offsetY = 30;

var w;
var grid;
var newGrid;
var keyP;
var randP;
var buttonP;
var startButton;
var check;

function setup() {
    createCanvas(900, 900 + offsetY);
    w = floor(width / sqPerLine);
    grid = CreateArray();

    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            grid[i][j] = 0;
        }
    }

    keyP = false;
    randP = false;
    buttonP = false;
    check = false;

    startButton = createButton("Начать игру");
    startButton.style('font-size', '30px');
    startButton.position(width / 2 - 80, height - height / 4);
    startButton.size(200, 60);
    startButton.mousePressed(play);
}

function InitialPage() {

    textAlign(CENTER);

    background(255);
    textSize(width / 15);
    fill(0);
    text("Жизнь диктует свои законы", width / 2, 200);

    textAlign(LEFT);

    stroke(0, 0, 0, 20);
    strokeWeight(4);
    fill(0);
    rect(width / 13, 300, 35, 35);

    noStroke();
    textSize(width / 30);
    fill(0);
    text("Черные клетки - живые", width / 13 + 45, 330);

    stroke(0, 0, 0, 20);
    strokeWeight(4);
    fill(255);
    rect(width / 2 + width / 13, 300, 35, 35);

    noStroke();
    textSize(width / 30);
    fill(0);
    text("Белые клетки - мертвые", width / 2 + width / 13 + 45, 330);

    textAlign(CENTER);

    textSize(width / 31);
    text("Правила:", width / 2, 425);
    text("1. Если рядом с клеткой меньше 2 живых – клетка умирает", width / 2, 500);
    text("2. Если рядом с клеткой больше 3 живых – клетка умирает.", width / 2, 550);
    text("3. Если рядом с клеткой ровно 3 живых – клетка оживает.", width / 2, 600);
}

function play() {

    startButton.hide();
    buttonP = true;
    textAlign(LEFT);
}

function draw() {

    if (!buttonP) {
        InitialPage();
    } else if (randP && !keyP) {
        fillGrid();
        write("Нажмите Enter для начала игры или самостоятельно заполните поле.");
    } else if (keyP == false) {
        fillGrid();
        write("Нажмите 'r' для случайного заполнения или вручную заполните поле. Нажмите Enter для старта.");
        check = true;
    } else {
        fillGrid();
        write("Нажмите Enter для паузы. Нажмите 'w' для сброса и начала новой игры.");

        newGrid = CreateArray();

        for (var i = 0; i < sqPerLine; i++) {
            for (var j = 0; j < sqPerLine; j++) {

                var current = grid[i][j];
                var neighbours = countNearby(i, j);

                if (current == 0 && neighbours == 3) {
                    newGrid[i][j] = 1;
                } else if (current == 1 && (neighbours < 2 || neighbours > 3)) {
                    newGrid[i][j] = 0;
                } else {
                    newGrid[i][j] = current;
                }
            }
        }

        grid = newGrid;
    }
}

function mousePressed() {

    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            if (check && mouseX > i * w && mouseX < i * w + w && mouseY > j * w + offsetY && mouseY < j * w + w + offsetY) {
                if (grid[i][j] == 0) {
                    grid[i][j] = 1;
                } else {
                    grid[i][j] = 0;
                }
                break;
            }
        }
    }
}

function keyTyped() {

    if (key == 'r' || key == 'к') {
        if (!keyP && buttonP) {
            for (var i = 0; i < sqPerLine; i++) {
                for (var j = 0; j < sqPerLine; j++) {
                    grid[i][j] = floor(random(2));
                }
            }

            keyP = false;
            randP = true;
        }
    }

    if (key == 'w' && buttonP || key == 'ц' && buttonP) {
        for (var i = 0; i < sqPerLine; i++) {
            for (var j = 0; j < sqPerLine; j++) {
                grid[i][j] = 0;
            }
        }

        randP = false;
        keyP = false;
    }
// 13 - "Enter"
    if (keyCode == 13 && buttonP) {
        if (!keyP) {
            keyP = true;
        } else if (keyP) {
            keyP = false;
        }
    }
}

function CreateArray() {

    var arr = new Array(sqPerLine);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(sqPerLine);
    }

    return arr;
}

function countNearby(i, j) {

    var lives = 0;

    for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
            if (i + x >= 0 && i + x < sqPerLine && j + y >= 0 && j + y < sqPerLine) {
                if (!(x == 0 && y == 0)) {
                    lives += grid[i + x][j + y];
                }
            }
        }
    }

    return lives;
}

function fillGrid() {

    background(255);
    strokeWeight(2);
    stroke(0, 0, 0, 20);

    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            if (grid[i][j] == 1) {
                fill(0);
            } else {
                fill(255);
            }
            rect(i * w, j * w + 30, w - 3, w - 3);
        }
    }
}

function write(words) {

    strokeWeight(2);
    stroke(255);
    fill(0);
    textSize(19);
    text(words, 1, 20);
}



