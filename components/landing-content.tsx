"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
	{
		name: "Alice",
		avatar: "A",
		title: "Product Manager",
		description: "I'm amazed by the functionality of this application!",
	},
	{
		name: "Bob",
		avatar: "B",
		title: "Graphic Designer",
		description: "My creative work has reached new heights with this tool.",
	},
	{
		name: "Charlie",
		avatar: "M",
		title: "Chief Financial Officer",
		description:
			"Premium subscription? Absolutely worth it. The quality is unparalleled.",
	},
	{
		name: "David",
		avatar: "D",
		title: "CTO",
		description: "Our development team wouldn't be as efficient without it.",
	},
];

export const LandingContent = () => {
	return (
		<div className="px-10 pb-20">
			<h2 className="text-center text-4xl text-white font-extrabold mb-10">
				Testimonials
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{testimonials.map((item) => (
					<Card
						key={item.description}
						className="bg-[#192339] border-none text-white"
					>
						<CardHeader>
							<CardTitle className="flex items-center gap-x-2">
								<div>
									<p className="text-lg">{item.name}</p>
									<p className="text-zinc-400 text-sm">{item.title}</p>
								</div>
							</CardTitle>
							<CardContent className="pt-4 px-0">
								{item.description}
							</CardContent>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
};
