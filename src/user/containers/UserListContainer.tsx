import { ReactElement } from "react";
import styled from "styled-components";

import { useUserList } from "../hooks/useUserList";
import { UserListComponent } from "../components/UserListComponent";

const Container = styled.div`
	max-width: 1224px;
	margin-left: auto;
	margin-right: auto;
	padding: calc(1rem) 6vw;
	// important to allow the table take size
	height: 100vh;
`;

export interface IUserListContainerProps {
	RowComponent?: ReactElement;
}

export const UserListContainer = (props: IUserListContainerProps) => {
	const { list, total, error, loading, size, setSize } = useUserList();

	const fetch = () => {
		setSize(size + 1);
	};

	if (list?.length === 0 && loading) {
		return <div>Loading</div>;
	}

	if (!list || error) {
		return <div>{error?.message}</div>;
	}

	return (
		<Container>
			<UserListComponent
				list={list}
				hasNextPage={true}
				isNextPageLoading={loading}
				total={total}
				fetch={fetch}
				{...props}
			></UserListComponent>
		</Container>
	);
};
