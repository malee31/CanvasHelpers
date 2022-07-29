import useGlobal from "../parts/GlobalData";
import MenuIcon from "../../static/menu_icon.svg";
import DoneIcon from "../../static/done_icon.svg";
import "./Navbar.css";

export default function Navbar() {
	const global = useGlobal();

	return (
		<nav className="nav-bar">
			<button
				className="nav-toggle"
				onClick={() => global.update({ leftNavOpen: !global.data.leftNavOpen })}
			>
				<MenuIcon className="nav-icon"/>
			</button>
			<span>CanvasHelpers UI</span>
			<button
				className="nav-toggle"
				onClick={() => global.update({ rightNavOpen: !global.data.rightNavOpen })}
			>
				<DoneIcon className="nav-icon"/>
			</button>
		</nav>
	);
}