interface ImportMetaEnv {
	readonly RESEND_KEY: string;
	readonly SENDER_ADDRESS: string;
	readonly RECIVER_ADDRESS: string;
	readonly NOREPLY_ADDRESS: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
