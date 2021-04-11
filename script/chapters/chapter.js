var CHAPTER = (function () {

    var privateAPI = {
      text: undefined,
      visible: false,
      startNewEnemyGroup: false,
      active: false,
      activeChapter: undefined

    }; 
    
    var service = {
        preloadChapter: preloadChapter,
        prepareNewChapter: prepareNewChapter,
        create: create,
        isActive: isActive,
        isStartNewEnemyGroup: isStartNewEnemyGroup,
        dontStartNewEnemyGroups: dontStartNewEnemyGroups,
        getGroup: getGroup,
        getChapterName: getChapterName
    };

    function preloadChapter(chapterObj, text, game) {
        privateAPI.text = text;
        privateAPI.visible = true;
        privateAPI.startNewEnemyGroup = false;

        privateAPI.active = true;

        privateAPI.activeChapter = chapterObj;
        chapterObj.preloadChapter(game);

    }

    function prepareNewChapter(game) {
        var chapter = privateAPI.activeChapter.createAndGetChapter(game);
        chapter.scale.x = 1;
        chapter.scale.y = 1;
//        chapter.body.velocity.x = -100;
    }

    function create() {
        privateAPI.active = false;
        privateAPI.text = "";
        privateAPI.visible = false;
        privateAPI.startNewEnemyGroup = true;

    }

    function startNewEnemyGroup(){
        privateAPI.startNewEnemyGroup = true;
    }

    function isStartNewEnemyGroup(){
        return privateAPI.startNewEnemyGroup;
    }

    function dontStartNewEnemyGroups(){
        privateAPI.startNewEnemyGroup = false;
    }

    function isActive(){
        return privateAPI.active;
    }

    function getActiveChapter() {
        return privateAPI.activeChapter;
    }

    function getChapterName(){
        return privateAPI.activeChapter.name();
    }

    function getGroup(){
        return privateAPI.activeChapter.getGroup();
    }

    return service;
}());