
uiClasses.factory("Character", ['loaderSvc', function (loaderSvc) {
    function Character(obj) {
        var spriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [loaderSvc.getResult(obj.characterAssetName)],
            //"frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
            "frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            "animations": {
                "stop": [61, 61, "stop", 1],
                "run": [0, 25, "run", 5],
                "walk": [0, 25, "walk", 1],
                "jump": [26, 63, "run"]
            }
        });
        this.grant = new createjs.Sprite(spriteSheet, "walk");
        this.grant.y = obj.y;

    }
    Character.prototype = {
        addToStage: function (stage) {
            stage.addChild(this.grant);
        },
        removeFromStage: function (stage) {
            stage.removeChild(this.grant);
        },
        getWidth: function () {
          return this.grant.getBounds().width * this.grant.scaleX;
        },
        getX: function () {
            return this.grant.x;
        },
        setX: function (val) {
            this.grant.x =  val;
        },
        playAnimation: function (animation) {
            this.grant.gotoAndPlay(animation);
        }
    };
    return (Character);
}
]);