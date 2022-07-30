import './Home.css';
import Navbar from "../components/sections/Navbar";
import Content from "../components/sections/Content";
import LeftSidebar from "../components/sections/LeftSidebar";
import RightSidebar from "../components/sections/RightSidebar";

function Home() {
	return (
		<div className="home">
			<LeftSidebar/>
			<section className="main-area">
				<Navbar/>
				<Content/>
			</section>
			<RightSidebar/>
		</div>
	);
}

export default Home;
