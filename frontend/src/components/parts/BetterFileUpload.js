import "./BetterFileUpload.css";

export default function BetterFileUpload(props) {
	const {
		className = "",
		accept,
		onChange,
		children = "",
		disabled,
		...args
	} = props;

	return (
		<label
			className={`better-file-upload ${disabled ? "better-file-upload-disable" : ""} ${className}`}
			{...args}
		>
			{children}
			<input
				type="file"
				accept={accept}
				disabled={disabled}
				onChange={onChange}
				hidden={true}
			/>
		</label>
	)
}