var NEW_ENEMY_GROUP = (function () {

    var startNewEnemyGroup = false;
    var startTime = 0;

    var api = {
        isStart: isStart,
        setStart: setStart,
        getStartTime: getStartTime,
        setStartTime: setStartTime

    };

    function isStart() {
        return startNewEnemyGroup;
    }

    function setStart(start){
        startNewEnemyGroup = start;
    }

    function getStartTime(){
        return startTime;
    }

    function setStartTime(time){
        startTime = time;
    }

    return api;
}());