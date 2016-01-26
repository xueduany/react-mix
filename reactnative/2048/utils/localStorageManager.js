var LocalStorageManager = function() {
    this.bestScoreKey = "bestScore";
    this.gameStateKey = "gameState";
    this.storage = localStorage;
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
LocalStorageManager.prototype.getBestScore = async function () {
	return await this.getItem(this.bestScoreKey) || 0;
};
LocalStorageManager.prototype.setBestScore = async function (score) {
	await this.setItem(this.bestScoreKey, score.toString());
};

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = async function () {
	var state = await this.getItem(this.gameStateKey);
	return state?JSON.parse(state):null;
};

LocalStorageManager.prototype.setGameState = async function(gameState) {
	var json = gameState?JSON.stringify(gameState):null;
	await this.setItem(this.gameStateKey,json);
};
LocalStorageManager.prototype.clearGameState = async function () {
	await this.removeItem(this.gameStateKey);
};

module.exports = LocalStorageManager;