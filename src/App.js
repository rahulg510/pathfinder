import "./App.css";
import Home from "./components/Home";
import { MatrixProvider } from "./contexts/MatrixContext";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "./components/alertComponents/AlertTemplate";

function App({ children }) {
	return (
		<AlertProvider
			template={AlertTemplate}
			position={"top center"}
			offset={"170px"}
			timeout={2500}
			transition={"scale"}
		>
			<MatrixProvider>
				<Home />
			</MatrixProvider>
		</AlertProvider>
	);
}

export default App;
