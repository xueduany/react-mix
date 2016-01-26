var LocalStorageManager = function() {
    this.bestScoreKey = "bestScore";
    this.gameStateKey = "gameState";
    this.storage = AsyncStorage;
}

LocalStorageManager.prototype.getItem = async function(key){
    try {
    	var value = await AsyncStorage.getItem(key);
    	if (value !== null){
    		return value;
    	} else {
    		return null;
    	}
    } catch (error) {
        return null;
    }
}
LocalStorageManager.prototype.setItem = async function(key,value){
    try {
    	await AsyncStorage.setItem(key, value);
    	return value;
    } catch (error) {
    	return null;
    }
}
LocalStorageManager.prototype.removeItem = async function(key){
    try {
    	await AsyncStorage.removeItem(key);
    	return key;
    } catch (error) {
    	return null;
    }
}

// Best score getters/setters
LocalStorageManager.prototype.getBestScore = function () {
	return this.getItem(this.bestScoreKey).done() || 0;
};
LocalStorageManager.prototype.setBestScore = function (score) {
    
	this.setItem(this.bestScoreKey, score.toString()).done();
};

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = function () {
	var state = this.getItem(this.gameStateKey).done();
	return state?JSON.parse(state):null;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
	var json = gameState?JSON.stringify(gameState):null;
	this.setItem(this.gameStateKey,json).done();
};
LocalStorageManager.prototype.clearGameState = function () {
	this.removeItem(this.gameStateKey).done();
};

module.exports = LocalStorageManager;