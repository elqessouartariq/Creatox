import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const apiLimitCount = await getApiLimitCount();
	const isPro = await checkSubscription();

	return (
		<div className="h-full relative">
			<div className=" hidden h-full md:w-72 md:flex md:flex-col  md:fixed md:inset-y-0  bg-red-500">
				<Sidebar
					isPro={isPro}
					apiLimitCount={apiLimitCount}
				/>
			</div>
			<main className="md:pl-72">
				<Navbar apiLimitCount={apiLimitCount} />
				{children}
			</main>
		</div>
	);
}
