export function wrapperEnv(envConfig: Recordable): ViteEnv {
	const ret: any = {};
	for (const key of Object.keys(envConfig)) {
		let realValue = envConfig[key];
		realValue = realValue === "true" ? true : realValue === "false" ? false : realValue;

		if (key === "VITE_PORT") {
			realValue = Number(realValue);
		}

		ret[key] = realValue;
		process.env[key] = realValue;
	}
	return ret;
}
