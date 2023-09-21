import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
	try {
		const { userId } = auth();
		const user = await currentUser();

		if (!user || !userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		const userSubscription = await prismadb.userSubscription.findUnique({
			where: {
				userId,
			},
		});

		if (userSubscription && userSubscription.stripeCustomerId) {
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: userSubscription.stripeCustomerId,
				return_url: settingsUrl,
			});

			return new NextResponse(JSON.stringify({ url: stripeSession.url }));
		}

		const stripeSession = await stripe.checkout.sessions.create({
			customer_email: user.emailAddresses[0].emailAddress,
			payment_method_types: ["card"],
			billing_address_collection: "auto",
			line_items: [
				{
					price_data: {
						currency: "USD",
						product_data: {
							name: "Creatox Pro",
							description: "Unlimited AI Generations per month",
						},
						unit_amount: 2000,
						recurring: {
							interval: "month",
						},
					},
					quantity: 1,
				},
			],
			metadata: {
				userId,
			},
			mode: "subscription",
			success_url: settingsUrl,
			cancel_url: settingsUrl,
		});

		return new NextResponse(JSON.stringify({ url: stripeSession.url }));
	} catch (error) {
		console.log("[STRIPE_ERROR]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
