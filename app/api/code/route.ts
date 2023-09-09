import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		const { messages } = body;

		const instructionMessge: ChatCompletionRequestMessage = {
			role: "system",
			content:
				"You are a code generator. You must answer only in markdown snippets. Use code comments for explanation. Any question not related to coding must be ignored and you should remind the user of your job briefly and suggest using other  such as conversation.ONly coding related questions are allowed.no tips for no coding",
		};

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!configuration.apiKey) {
			return new NextResponse("OpenAI API Key not configured", {
				status: 500,
			});
		}

		if (!messages) {
			return new NextResponse("Messages not provided", { status: 400 });
		}

		const response = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages: [instructionMessge, ...messages],
		});

		return NextResponse.json(response.data.choices[0].message);
	} catch (error) {
		console.log("[CODE_ERROR]", error);
		return new NextResponse("Internal error", { status: 500 });
	}
}
