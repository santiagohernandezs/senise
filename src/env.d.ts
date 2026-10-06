interface ImportMetaEnv {
	readonly RESEND_KEY: string;
	readonly SENDER_ADDRESS: string;
	readonly RECIVER_ADDRESS: string;
	readonly NOREPLY_ADDRESS: string;
	readonly PUBLIC_HERO_VIDEO_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
