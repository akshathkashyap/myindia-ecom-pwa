import axios, { AxiosInstance, AxiosResponse } from "axios";

class Axios {
	private apiBaseUrl: string = (process.env.REACT_APP_API ?? "http://192.168.29.22:3000") + "/api/";
	private axiosInstance: AxiosInstance;

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: this.apiBaseUrl,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"ngrok-skip-browser-warning": "*",
			},
		});

		// this.axiosInstance.interceptors.request.use(
		//     config => {
		//       // You can add any custom configurations or headers here
		//       return config;
		//     },
		//     error => {
		//       return Promise.reject(error);
		//     }
		// );

		// this.axiosInstance.interceptors.response.use(
		// response => {
		//     // You can add any custom processing for responses here
		//     return response;
		// },
		// error => {
		//     return Promise.reject(error);
		// }
		// );
	}

	private apiEndpointIsVerified(apiEndpoint: string): boolean {
		const allowedApiEndpoints: string[] = ["/search", "/product", "/lowest-priced"];
		if (allowedApiEndpoints.includes(apiEndpoint)) return true;
		return false;
	}

	async get(apiEndpoint: string, queryParams?: Record<string, string>): Promise<AxiosResponse | null> {
		if (!this.apiEndpointIsVerified(apiEndpoint)) return null;

		let response: AxiosResponse;
		const config = {
			params: queryParams,
		};

		try {
			response = await this.axiosInstance.get(apiEndpoint, config);
			return response;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

export default Axios;
