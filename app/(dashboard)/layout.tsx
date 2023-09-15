import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const apiLimitCount = await getApiLimitCount();

	return (
		<div className="h-full relative">
			<div className=" hidden h-full md:w-72 md:flex md:flex-col  md:fixed md:inset-y-0 z-[80] bg-red-500">
				<Sidebar apiLimitCount={apiLimitCount} />
			</div>
			<main className="md:pl-72">
				<Navbar apiLimitCount={apiLimitCount} />
				{children}
			</main>
		</div>
	);
}
