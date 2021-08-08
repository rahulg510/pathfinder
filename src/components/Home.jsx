import { Legend } from "./Legend.jsx";
import Matrix from "./Matrix.js";
import OptionsBar from "./OptionsBar.jsx";

const Home = () => {
	return (
		<div>
			<OptionsBar />
			<div className="container-fluid">
				<Legend />
				<Matrix />
			</div>
		</div>
	);
};

export default Home;
