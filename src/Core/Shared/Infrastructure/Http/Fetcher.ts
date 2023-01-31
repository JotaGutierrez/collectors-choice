
const fetcher = async (url: string, queryParams: string = ''): Promise<any> => fetch(`${url}${queryParams}`).then(r => r.json())

export default fetcher;
