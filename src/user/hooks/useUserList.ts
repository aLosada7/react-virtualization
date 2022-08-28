import axios from "axios";
import useSWRInfinite from "swr/infinite";

import { IUserBase } from "../model/user";

const SWR_KEY = "users";

export interface IUseUserList {
	list?: IUserBase[];
	total: number;
	error?: Error;
	loading: boolean;
	size: number;
	setSize: (arg0: number) => void;
}

export const useUserList = (): IUseUserList => {
	const getKey = (pageIndex: number, previousPageData: string | any[]) => {
		// check if end has been reached
		if (previousPageData && !previousPageData.length) return null;
		return `/${SWR_KEY}?page=${pageIndex}`;
	};

	const fetcher = (): any => {
		return axios.get(`https://gorest.co.in/public/v2/${SWR_KEY}?page=${size}`).then((res) => res.data);
	};

	const {
		data: list,
		error,
		isValidating,
		size,
		setSize,
	} = useSWRInfinite(getKey, fetcher, {
		revalidateFirstPage: false,
		revalidateAll: true,
	});

	return {
		list: (list || []).flat(),
		total: list ? list[0].total : 0,
		error,
		loading: isValidating,
		size,
		setSize,
	};
};
