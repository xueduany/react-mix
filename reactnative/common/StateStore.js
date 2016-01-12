class StateStore{
	constructor(args){
		this.key = args.key;
		this.value = args.defaultData;
		this.init();
		return this;
	}
	async init(){
		 await this.updateStore();
		 return this;
	}
	async set(value){
		this.value = value;
		var result = await this.updateStore();
		return result;
	}
	async setAttr(attrKey, attrValue){
		this.value[attrKey] = attrValue;
		var result = await this.updateStore();
		return result;
	}
	
	async getAttr(attrKey){
		await this.get();
		return this.store.data[attrKey];
	}
	async get(){
		var str = await localStorage.getItem(this.key);
		console.debug(str);
		this.store = JSON.parse(str);
		return this.store;
	}
	async updateStore(){
		this.store = {
				value : this.value,
				timeout: new Date().format('yyyy/MM/dd hh:mm:ss'),
				savedata: new Date().format('yyyy/MM/dd hh:mm:ss')
		}
		var result = await localStorage.setItem(this.key, JSON.stringify(this.store));
		return result;
	}
}
module.exports = StateStore;