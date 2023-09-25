import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserAvatar = () => {
	const { user } = useUser();
	return (
		<Avatar className="h-8 w-8">
			<AvatarImage src={user?.profileImageUrl} />
			<AvatarFallback>
				{user?.firstName ? user.firstName[0] : "F"}
				{user?.lastName ? user.lastName[0] : "L"}
			</AvatarFallback>
		</Avatar>
	);
};
