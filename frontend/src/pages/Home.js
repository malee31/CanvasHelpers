import './Home.css';
import Navbar from "../components/sections/Navbar";
import Dropdown from "../components/mechanisms/Dropdown";
import Content from "../components/sections/Content";
import useGlobal from "../components/parts/GlobalData";
import LeftSidebar from "../components/sections/LeftSidebar";
import RightSidebar from "../components/sections/RightSidebar";

const testData = [
	{
		text: "ECS 36A",
		value: "999"
	},
	{
		text: "ECS 36A",
		value: "99"
	},
	{
		text: "ECS 36A",
		value: "9"
	},
];

function Home() {
	const global = useGlobal();
	const openLeftNav = global.data.leftNavOpen;
	const openRightNav = global.data.rightNavOpen;

	return (
		<div className="home">
			<LeftSidebar/>
			<section className="main-area">
				<Navbar/>
				<Content>
					<Dropdown
						title="Classes"
						items={testData}
						type="select"
					/>
				</Content>
			</section>
			<RightSidebar/>
		</div>
	);
}

export default Home;
