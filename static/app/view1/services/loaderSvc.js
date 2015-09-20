myServices.service('loaderSvc', function () {
        var manifest = [
            {src: "spritesheet_grant.png", id: "grant"},
            {src: "sky1.png", id: "sky"},
            {src: "ground_grass.png", id: "ground"},
            {src: "hill7.png", id: "hill"},
            {src: "hill6.png", id: "hill2"},
            {src: "logo_krypton.png", id: "logo"},
            {src: "runningTrack.mp3", id: "runningSound"},
            {src: "jump.mp3", id: "jumpingSound"}
        ], loader = new createjs.LoadQueue(true);
        createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin]);  // need this so it doesn't default to Web Audio
        loader.installPlugin(createjs.Sound);
    this.getResult = function (asset) {
                return loader.getResult(asset);
            };
    this.getLoader = function () {
                return loader;
            };
    this.loadAssets = function () {
                loader.loadManifest(manifest, true, "/static/app/assets/");
            };
    });