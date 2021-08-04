import "./App.css";
import Home from "./components/Home";
import { MatrixProvider } from "./contexts/MatrixContext";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

function App() {
	return (
		<AlertProvider
			template={AlertTemplate}
			position={"top center"}
			timeout={2000}
			transition={"scale"}

		>
			<MatrixProvider>
				<Home />
			</MatrixProvider>
		</AlertProvider>
	);
}

export default App;
