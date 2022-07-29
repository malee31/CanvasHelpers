import "./Content.css";

export default function Content({ children }) {
	return (
		<main>
			<div className="main-content">
				{children}
			</div>
		</main>
	)
}