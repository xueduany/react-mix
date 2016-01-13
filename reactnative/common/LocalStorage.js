class LocalStorage{
	constructor(){
		this.store = require('AsyncStorage');
		for(var method in this.store){
			this[method] = this.store[method];
		}
		console.debug(this);
	}
	async json(){
		var keys = await this.getAllKeys();
		console.debug(keys);
		var re = {};
		for(var i = 0;i<keys.length;i++){
			 re[keys[i]] = await this.getItem(keys[i]);
		}
		return re;
	}
}
module.exports =  new LocalStorage();