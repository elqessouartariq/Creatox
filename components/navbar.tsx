import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-sidebar";

const Navbar = ({ apiLimitCount = 0 }) => {
	return (
		<div className="flex items-center p-4">
			<MobileSidebar  apiLimitCount={apiLimitCount} />
			<div className="flex w-full justify-end">
				<UserButton afterSignOutUrl="/" />
			</div>
		</div>
	);
};

export default Navbar;
