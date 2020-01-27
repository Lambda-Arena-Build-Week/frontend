export const validateAuthentication = () => {
	return localStorage.getItem("token") !== null;
}