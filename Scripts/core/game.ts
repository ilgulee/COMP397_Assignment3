/// <reference path = "_reference.ts" />

// global variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;
var stats: Stats;
var textureAtlas: createjs.SpriteSheet;

var currentScene: objects.Scene;
var scene: number;

var livesValue: number;
var scoreValue: number;
var highScoreValue: number = 0;

// Game Scenes
var menu: scenes.Menu;
var play: scenes.Play;
var end: scenes.End;

var atlas = {
    "images": [
        "../../Assets/images/atlas.png"
    ],
    "frames": [
    [1, 1, 326, 342, 0, -12, -35],
    [1, 345, 180, 180, 0, 0, 0],
    [1, 527, 176, 175, 0, 0, 0],
    [329, 1, 166, 154, 0, 0, 0],
    [329, 157, 157, 154, 0, 0, 0],
    [183, 345, 172, 163, 0, 0, 0],
    [357, 313, 129, 111, 0, 0, 0],
    [183, 510, 183, 162, 0, 0, 0],
    [179, 674, 176, 55, 0, 0, 0],
    [357, 426, 128, 48, 0, 0, 0],
    [368, 476, 97, 69, 0, -1, -1],
    [368, 547, 69, 71, 0, 0, 0],
    [368, 620, 96, 38, 0, -2, -15],
    [368, 660, 122, 33, 0, 0, 0],
    [439, 547, 6, 50, 0, -17, 0],
    [329, 313, 18, 16, 0, 0, 0]
    ],
    "animations": {
     "ship": { "frames": [0] },
    "exp4": { "frames": [1] },
    "exp5": { "frames": [2] },
    "exp3": { "frames": [3] },
    "exp7": { "frames": [4] },
    "exp6": { "frames": [5] },
    "exp2": { "frames": [6] },
    "boss": { "frames": [7] },
    "start": { "frames": [8] },
    "how": { "frames": [9] },
    "invader": { "frames": [10] },
    "exp1": { "frames": [11] },
    "replay": { "frames": [12] },
    "back": { "frames": [13] },
    "laser": { "frames": [14] },
    "heart": { "frames": [15] },
    "explosion": {
            "frames": [11, 6, 3, 1, 2,5,4],
            "speed": 0.5,next:false
        }
    },"texturepacker": [
        "SmartUpdateHash: $TexturePacker:SmartUpdate:003a259b2f21f68dfcb265fa0b3fc2b5:ee69c7c62c81501a6640957397998918:cbce6b53f0f49e0bf15173c25c41f876$",
        "Created with TexturePacker (https://www.codeandweb.com/texturepacker) for EaselJS"
]
}

var assetData:objects.Asset[] = [
    // Add your Assets here
   // {id: "StartButton", src:"../../Assets/images/StartButton.png"},
   // {id: "RestartButton", src:"../../Assets/images/RestartButton.png"},
   // {id: "BackButton", src:"../../Assets/images/BackButton.png"},
   // {id: "ocean", src:"../../Assets/images/ocean.gif"},
    {id: "galaxy", src:"../../Assets/images/galaxy.png"},
    {id: "engine", src:"../../Assets/audio/engine.ogg"},
    {id: "yay", src:"../../Assets/audio/yay.ogg"},
    {id: "thunder", src:"../../Assets/audio/thunder.ogg"},
    {id: "images",src:"../../Assets/images/atlas.png"}
];

function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}

function init(): void {
    // instantiate textureAtlas
    textureAtlas = new createjs.SpriteSheet(atlas);
    
    
    // create a reference the HTML canvas Element
    canvas = document.getElementById("canvas");
    
    // create our main display list container
    stage = new createjs.Stage(canvas);
    
    // Enable mouse events
    stage.enableMouseOver(20);
    
    // set the framerate to 60 frames per second
    createjs.Ticker.setFPS(config.Game.FPS);
    
    // create an event listener to count off frames
    createjs.Ticker.on("tick", gameLoop, this);
    
    // sets up our stats counting workflow
    setupStats(); 
    
    // set initial scene
    scene = config.Scene.MENU;
    changeScene();
}

// Main Game Loop function that handles what happens each "tick" or frame
function gameLoop(event: createjs.Event): void {
    // start collecting stats for this frame
    stats.begin(); 
    
    // calling State's update method
    currentScene.update(); 
    
    // redraw/refresh stage every frame
    stage.update();
    
    // stop collecting stats for this frame
    stats.end();
}

// Setup Game Stats
function setupStats(): void {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}

// Finite State Machine used to change Scenes
function changeScene(): void {
    
    // Launch various scenes
    switch (scene) {
        case config.Scene.MENU:
            // show the MENU scene
            stage.removeAllChildren();
            menu = new scenes.Menu();
            currentScene = menu;
            console.log("Starting MENU Scene");
            break;
        case config.Scene.PLAY:
            // show the PLAY scene
            stage.removeAllChildren();
            play = new scenes.Play();
            currentScene = play;
            console.log("Starting PLAY Scene");
            break;
        case config.Scene.END:
            // show the END scene
            stage.removeAllChildren();
            end = new scenes.End();
            currentScene = end;
            console.log("Starting END Scene");
            break;
    }

    console.log(currentScene.numChildren);
}

window.onload = preload;