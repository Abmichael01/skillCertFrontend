import TestsByUser from "@/app/_components/profile/TestsByUser"
import UserInfo from "@/app/_components/profile/UserInfo"
import MainPaddingLayout from "@/app/_layouts/MainPaddingLayout"

const page = () => {
	return (
		<MainPaddingLayout>
			<div className="flex gap-10 flex-col">
				 <div className="">
				 	<UserInfo />
				 </div>
				 <TestsByUser />
			</div>
		</MainPaddingLayout>
	)
}

export default page