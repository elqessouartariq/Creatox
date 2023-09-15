"use client";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

const MobileSidebar = ({ apiLimitCount = 0 }) => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setIsOpen(true);
	}, []);

	if (!isOpen) return null;

	return (
		<Sheet>
			<SheetTrigger className="md:hidden">
				<Menu />
			</SheetTrigger>
			<SheetContent
				side="left"
				className="p-0"
			>
				<Sidebar  apiLimitCount={apiLimitCount}/>
			</SheetContent>
		</Sheet>
	);
};

export default MobileSidebar;
