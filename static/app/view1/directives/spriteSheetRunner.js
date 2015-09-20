myDirectives.directive('spriteSheetRunner', ['$window','$timeout','loaderSvc','Sky', 'Ground', 'Hill', 'Character', 'Logo', function ($window, $timeout, loaderSvc, Sky, Ground, Hill, Character, Logo) {
        "use strict";
        return {
            restrict : 'EAC',
            replace : true,
            scope :{
                width: '=',
                height: '=',
                score: '=',
                lifesCount: '=',
                sensorData: '=',
                status: '='
            },
            template: "<canvas></canvas>",
            link: function (scope, element, attribute) {
                var w, h, sky, grant, ground, hill, hill2, runningSoundInstance, logo;

                scope.status = 'initialize';

                drawGame();
                element[0].width = scope.width;
                element[0].height = scope.height;
                w = scope.width;
                h = scope.height;
                function drawGame() {
                    //drawing the game canvas from scratch here
                    if (scope.stage) {
                        scope.stage.autoClear = true;
                        scope.stage.removeAllChildren();
                        scope.stage.update();
                    } else {
                        scope.stage = new createjs.Stage(element[0]);
                    }
                    w = scope.stage.canvas.width;
                    h = scope.stage.canvas.height;
                    loaderSvc.getLoader().addEventListener("complete", handleComplete);
                    loaderSvc.loadAssets();
                }
                function handleComplete() {
                    sky = new Sky({width:w, height:h});
                    sky.addToStage(scope.stage);
                    logo = new Logo({y: 10});
                    logo.setHorizontalCenterAt(w / 2);
                    logo.addToStage(scope.stage);
                    ground = new Ground({width:w, height:h});
                    hill = new Hill({width:w, height:h, scaleFactor: 1, assetName: 'hill', groundHeight: ground.getHeight()});
                    hill.setAlpha(0.5);
                    hill.addToStage(scope.stage);
                    hill2 = new Hill({width:w, height:h, scaleFactor: 1, assetName: 'hill2', groundHeight: ground.getHeight()});
                    hill2.addToStage(scope.stage);
                    ground.addToStage(scope.stage);
                    grant = new Character({characterAssetName: 'grant', y: 34})
                    grant.addToStage(scope.stage);

                    scope.stage.addEventListener("stagemousedown", handleJumpStart);
                    createjs.Ticker.timingMode = createjs.Ticker.RAF;
                    createjs.Ticker.addEventListener("tick", tick);
                    // start playing the running sound looping indefinitely
                    //runningSoundInstance = createjs.Sound.play("runningSound", {loop: -1});
                    //scope.status = "stop";

                    window.onkeydown = keydown;
                    scope.score = 10;
                    scope.lifesCount = 2;
                    scope.$apply();
                }
                function keydown(event) {
                    if (event.keyCode === 38) {//if keyCode is "Up"
                        handleJumpStart();
                    }
                    if (event.keyCode === 39) {
                    //if keyCode is "Right"
                        if (scope.status === "paused") {
                            createjs.Ticker.addEventListener("tick", tick);
                            runningSoundInstance = createjs.Sound.play("runningSound", {loop: -1});
                            scope.status = "running";
                        }
                    }
                    if (event.keyCode === 37) {//if keyCode is "Left"
                        createjs.Ticker.removeEventListener("tick", tick);
                        createjs.Sound.stop();
                        scope.status = "paused";
                    }
                }

                function tick(event) {
                    var deltaS = event.delta / 1000;
                    var position = grant.getX() + 150 * deltaS;

                    grant.setX((position >= w + grant.getWidth()) ? -grant.getWidth() : position);
                    ground.setX((ground.getX() - deltaS * 150) % ground.getTileWidth());
                    hill.move(deltaS * -30, 0);
                    if (hill.getX() + hill.getImageWidth() * hill.getScaleX() <= 0) {
                        hill.setX(w);
                    }
                    hill2.move(deltaS * -45, 0);
                    if (hill2.getX() + hill2.getImageWidth() * hill2.getScaleX() <= 0) {
                        hill2.setX(w);
                    }
                    scope.stage.update(event);
                }



                function handleJumpStart() {
                    if (scope.status === "running") {
                        createjs.Sound.play("jumpingSound");
                        grant.playAnimation("jump");
                    }
                }


                function handleRunning() {
                    if (scope.status === "walking" && scope.status != "running") {
                        $timeout(function(){
                            console.log('handleRunning')
                            grant.playAnimation("run");
                        },200);
                    }
                }

                function handleStop() {
                    if (scope.status === "walking" || scope.status === "initialize") {
                        $timeout(function(){
                            console.log('handleStop')
                            //createjs.Ticker.removeEventListener("tick", tick);
                            grant.playAnimation("stop");
                            scope.status = "stop";

                            handleStartWalking()

                        }, 100);

                    }
                }

                function handleWalking() {
                    if ((scope.status === "stop" || scope.status === "running" || scope.status === "start_walking") && scope.status != 'walking') {
                        $timeout(function(){
                            console.log('handleWalking')
                            //createjs.Ticker.addEventListener("tick", tick);
                            grant.playAnimation("walk");
                            scope.status = "walking";
                        },200);

                    }
                }

                scope.$watch('sensorData', function(newVal, oldVal){


                    if (Math.round(newVal.values[0]) < 10 && Math.round(newVal.values[0]) > -10){
                        //createjs.Ticker.removeEventListener("tick", tick);
                        //scope.status = "paused";
                        handleStop()
                    }

                    if (Math.round(newVal.values[0]) > 10 || Math.round(newVal.values[0]) < -10){
                        //createjs.Ticker.addEventListener("tick", tick);
                        //scope.status = "walk";
                        handleWalking()
                    }

                    if (Math.round(newVal.values[0]) > 30 || Math.round(newVal.values[0]) < -30){
                        handleRunning()
                    }

                    if (Math.round(newVal.values[0]) > 40){
                        handleJumpStart();
                    }
                });
            }
        }
    }]);
