class StateStore{
	constructor(args){
		this.key = args.key;
		this.lifeTime = args.lifeTime || '1D';


		(async function(){
			var store_value = await this.getValue();
		
			if(store_value) {
	
				console.debug('store_value ', store_value);
	       
				this.store = store_value;
				this.value = store_value;
	
			} 
			else {
				//默认值
				if(args.defaultData) {
					this.value = args.defaultData;
					this.init();
	
				}
			}
		}).call(this);
		
		return this;
	}

	async getValue() {
		var re =  await localStorage.getItem(this.key) ;
		var re_obj = re ? JSON.parse(re).value : '';
		var store;

		console.debug('re_obj ', re_obj);

		//检查是否有过期
		if(new Date().getTime() < new Date(re_obj ? re_obj.timeout: new Date()).getTime() ) {
			store = re_obj;
		} else {
			store = '';
		}

		return store;


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

		console.debug('getAttr ',this.store[attrKey],  this.store, attrKey)

		return this.store[attrKey];
	}
	async get(){
		var str = await localStorage.getItem(this.key);
		console.debug('gggg ', str);
		if(str != null){
			this.store = JSON.parse(str).value;
		}else{
			return null;
		}
		return this.store;
	}
	async updateStore(){

		var timeout;
		var num = parseInt(this.lifeTime);

		console.debug('num ', num);

		//加上过期时间
		if(this.lifeTime.indexOf('D') > -1) {
			timeout = new Date().addDay(num).format('yyyy/MM/dd HH:mm:ss');
		} else if(this.lifeTime.indexOf('M') > -1) {
			timeout = new Date().addMinute(num).format('yyyy/MM/dd HH:mm:ss');
		}


		this.store = {
				value : this.value,
				timeout: timeout,
				savedata: new Date().format('yyyy/MM/dd HH:mm:ss')
		}
		var result = await localStorage.setItem(this.key, JSON.stringify(this.store));
		return result;
	}
}
module.exports = StateStore;