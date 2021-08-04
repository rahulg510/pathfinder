import { Legend } from "./Legend.jsx";
import Matrix from "./Matrix.js";
import OptionsBar from "./OptionsBar.jsx";
// import StatusBar from "./StatusBar";

const Home = () => {
	return (
		<div>
			<OptionsBar />
			{/* <StatusBar /> */}
			<div className="container-fluid">
				<Legend />
				<Matrix />
			</div>
		</div>
	);
};

export default Home;
