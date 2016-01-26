var Container = require('./components/container');

(class Game extends App{
	render(){
		return (
				<Container startTiles={2} size={4}/>
		);
	}
}).run();
