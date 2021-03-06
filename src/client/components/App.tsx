import { useState, useEffect } from "react";
import icon from "../assets/icon.png";
import styles from "./App.scss";
import { MultiRoleSelector } from "./selectors/MultiRoleSelector";
import { MultiChannelSelector } from "./selectors/MultiChannelSelector";
import { User } from "../types/types";

const exampleRoles = [
	{
		id: "123",
		name: "Role #12334567",
		color: "#FF0000"
	},
	{
		id: "234",
		name: "Role #2",
		color: "#00FF00"
	},
	{
		id: "345",
		name: "Role #3",
		color: "#0000FF"
	},
	{
		id: "456",
		name: `A role with a ${"really ".repeat(10)} long name`,
		color: "#00FFFF"
	}
];

const exampleChannels = [
	{
		id: "123",
		name: "Channel #12334567"
	},
	{
		id: "234",
		name: "Channel #2"
	},
	{
		id: "345",
		name: "Channel #3"
	},
	{
		id: "456",
		name: `A Channel with a ${"really ".repeat(10)} long name`
	}
];

export const App = () => {
	const [userData, setUserData] = useState<User | null>(null);
	const [selectedRoleIDs, setSelectedRoleIDs] = useState(["123", "234"]);
	const [selectedChannelIDs, setSelectedChannelIDs] = useState(["123", "234"]);

	useEffect(() => {
		fetch("/api/user")
			.then(req => req.json())
			.then(setUserData);
	}, []);

	if (userData === null) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.app}>
			<div className={styles.navbar}>
				<div><img src={icon} alt="Suggester icon" className={styles.icon} /></div>
				<div>
					<a
						href="https://discord.gg/XR6UhAj"
						className={styles.navbarLink}
						target="_blank"
						rel="noreferrer">
						Discord server
					</a>
					<a
						href={"https://discordapp.com/oauth2/authorize?client_id=564426594144354315&scope=bot&permissions=805694544"}
						className={styles.navbarLink}
						target="_blank"
						rel="noreferrer">
						Invite the bot!
					</a>
					<span className={styles.userInfo}>
						Logged in as {userData.username}#{userData.discriminator}
					</span>
				</div>
			</div>
			<div style={{ position: "relative" }}>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<div style={{ margin: "2rem" }}>
						<MultiRoleSelector
							roles={exampleRoles}
							selectedRoleIDs={selectedRoleIDs}
							setSelectedRoleIDs={setSelectedRoleIDs} />
					</div>
					<div style={{ margin: "2rem" }}>
						<MultiChannelSelector
							channels={exampleChannels}
							selectedChannelIDs={selectedChannelIDs}
							setSelectedChannelIDs={setSelectedChannelIDs} />
					</div>
				</div>
			</div>
		</div>
	);
};
