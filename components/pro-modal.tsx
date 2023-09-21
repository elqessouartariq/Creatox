"use client";

import { Badge } from "./ui/badge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import {
	Check,
	Code,
	ImageIcon,
	MessageSquare,
	Music,
	VideoIcon,
	Zap,
} from "lucide-react";

import { useProModal } from "@/hooks/use-pro-modal";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { ST } from "next/dist/shared/lib/utils";

const tools = [
	{
		label: "Conversation",
		icon: MessageSquare,
		color: "text-violet-500",
		bgColor: "bg-violet-500/10",
	},
	{
		label: "Music Generation",
		icon: Music,
		color: "text-emerald-500",
		bgColor: "bg-emerald-500/10",
	},
	{
		label: "Image Generation",
		icon: ImageIcon,
		color: "text-pink-700",
		bgColor: "bg-pink-700/10",
	},
	{
		label: "Video Generation",
		icon: VideoIcon,
		color: "text-orange-700",
		bgColor: "bg-orange-700/10",
	},
	{
		label: "Code Generation",
		icon: Code,
		color: "text-green-700",
		bgColor: "bg-green-700/10",
	},
];

export const ProModal = () => {
	const proModal = useProModal();
	const [loading, setLoading] = useState(false);

	const onSubscribe = async () => {
		try {
			setLoading(true);
			const response = axios.get("/api/stripe");
			window.location.href = (await response).data.url;
		} catch (error) {
			console.log(error, "STRIPE_CLIENT_ERROR");
		} finally {
			setLoading(false);
		}
	};
	return (
		<Dialog
			open={proModal.isOpen}
			onOpenChange={proModal.onClose}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2 ">
						<div className="flex items-center gap-x-3 font-bold py-1">
							Upgrade to Creatox
							<Badge
								className="uppercase text-sm py-1"
								variant="premium"
							>
								pro
							</Badge>
						</div>
					</DialogTitle>
					<DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
						{tools.map((tool) => (
							<Card
								key={tool.label}
								className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
							>
								<div className="flex items-center gap-x-4">
									<div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
										<tool.icon className={cn("w-6 h-6", tool.color)} />
									</div>
									<div className="font-semibold text-sm">{tool.label}</div>
								</div>
								<Check className="text-primary w-5 h-5" />
							</Card>
						))}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						disabled={loading}
						size="lg"
						variant="premium"
						className="w-full"
						onClick={onSubscribe}
					>
						Upgrade
						<Zap className="w-5 h-5 ml-2 fill-white" />
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
