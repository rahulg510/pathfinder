import { bfs } from "./BFS";
import { dfs } from "./DFS";
import { dijkstra } from "./dijkstras";
import { gfs } from "./GreedyFirstSearch";
import { aStar } from "./aStar";
import { biDijkstra } from "./biDijkstras";
import { biAStar } from "./biAStar";
import { biGreedyFirstSearch } from "./biGreedyFirstSearch";
export {
	dfs,
	bfs,
	dijkstra,
	gfs,
	aStar,
	biDijkstra,
	biAStar,
	biGreedyFirstSearch,
};
export const ASTAR = "A* Search";
export const BFS = "Breadth-First Search";
export const DFS = "Depth-First Search";
export const DIJ = "Dijkstra's Algorithm";
export const GFS = "Greedy Best-First Search";
export const BGFS = "Bidirectional Greedy Best-First Search";
export const BDIJ = "Bidirectional Dijkstra's Algorithm";
export const BASTAR = "Front-to-Front Bidirectional A* Search";

export const algoInfo = {
	"A* Search": {
		weighted: true,
		shortestGuaranteed: true,
	},
	"Breadth-First Search": {
		weighted: false,
		shortestGuaranteed: true,
	},
	"Bidirectional Greedy Best-First Search": {
		weighted: true,
		shortestGuaranteed: false,
	},
	"Depth-First Search": {
		weighted: false,
		shortestGuaranteed: false,
	},
	"Dijkstra's Algorithm": {
		weighted: true,
		shortestGuaranteed: true,
	},
	"Bidirectional Dijkstra's Algorithm": {
		weighted: true,
		shortestGuaranteed: true,
	},
	"Front-to-Front Bidirectional A* Search": {
		weighted: true,
		shortestGuaranteed: true,
	},
	"Greedy Best-First Search": {
		weighted: true,
		shortestGuaranteed: false,
	},
};
