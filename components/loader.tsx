import Image from "next/image";

export const Loader = () => {
	return (
		<div className="h-full flex flex-col items-center justify-center">
			<div className="w-12 h-12 relative animate-pulse">
				<Image
					alt="Loader"
					fill
					src="/logo.svg"
				/>
			</div>
			<p className="text-sm text-muted-foreground">Creatox is thinking...</p>
		</div>
	);
};
