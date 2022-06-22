const postData = async (url, data) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json"
		},
		body: data
	});
	// eslint-disable-next-line no-return-await
	return await res.json();
};

export default postData;
