import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
	return (
		<>
			<p>Dash Page (protected)</p>;
			<UserButton afterSignOutUrl="/" />
		</>
	);
};

export default DashboardPage;
