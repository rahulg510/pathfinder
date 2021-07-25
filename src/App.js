import "./App.css";
import Matrix from "./components/Matrix";
import { MatrixProvider } from "./contexts/MatrixContext";

function App() {
	return (
		<>
			<MatrixProvider>
				<Matrix />
			</MatrixProvider>
		</>
	);
}

export default App;
