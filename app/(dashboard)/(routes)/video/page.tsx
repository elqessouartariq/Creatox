"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "@/components/Heading";

import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";

const MusicPage = () => {
	const proModal = useProModal();
	const router = useRouter();
	const [video, setVideo] = useState<string>();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	});
	const isLoading = form.formState.isSubmitting;
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		try {
			setVideo(undefined);
			const response = await axios.post("/api/video", data);
			setVideo(response.data[0]);
			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403) {
				proModal.onOpen();
			}
			console.log(error);
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Video Generation"
				description="Turn your prompt into video."
				icon={VideoIcon}
				iconColor="text-orange-700"
				bgColor="bg-orange-700/10"
			/>
			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="rounded-lg border  w-full p-4  px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="m-0 p-0">
											<Input
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
												disabled={isLoading}
												placeholder="An astronaut riding a horse"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className="col-span-12 lg:col-span-2 w-full"
								disabled={isLoading}
							>
								Generate
							</Button>
						</form>
					</Form>
				</div>
				<div className="space-y-4 mt-4">
					{isLoading && (
						<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
							<Loader />
						</div>
					)}
					{!video && !isLoading && (
						<div>
							<Empty label="No Music generated yet." />
						</div>
					)}
					{video && (
						<video
							controls
							className="w-full aspect-video mt-8 rounded-lg border bg-black"
						>
							<source src={video} />
						</video>
					)}
				</div>
			</div>
		</div>
	);
};

export default MusicPage;
