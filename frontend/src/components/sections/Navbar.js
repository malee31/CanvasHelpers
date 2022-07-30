import "./Navbar.css";
import RoughCanvasIcon from "../../static/rough_canvas.svg";

export default function Navbar() {
	return (
		<nav className="nav-bar">
			<span style={{
				display: "flex",
				alignItems: "center",
			}}>
				<RoughCanvasIcon width="2rem" height="2rem"/> CanvasHelpers UI</span>
		</nav>
	);
}