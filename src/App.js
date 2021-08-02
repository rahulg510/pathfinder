import "./App.css";
import Home from "./components/Home";
import { MatrixProvider } from "./contexts/MatrixContext";

function App() {
	return (
			<MatrixProvider>
				<Home />
			</MatrixProvider>
	);
}

export default App;
