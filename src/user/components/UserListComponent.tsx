import { ReactElement } from "react";
import styled from "styled-components";

import { IUserBase } from "../model/user";
import { VirtualList } from "../../shared/components";

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid rgb(233, 236, 239);
	padding: 6px;
	height: 60px;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
`;

const EmptyListMessage = styled.p`
	text-align: center;
	padding: 14px;
`;

const Badge = styled.span<{ status: string }>`
	margin: 0 1rem;
	padding: 0.5rem;
	border-radius: 4px;
	background: ${(props) => (props.status === "active" ? "#22874D" : "#C70000")};
	color: rgb(252, 252, 252);
`;

interface IUserListComponentProps {
	list: IUserBase[];
	total: number;
	hasNextPage: boolean;
	isNextPageLoading: boolean;
	fetch: () => void;
	RowComponent?: ReactElement;
}

const UserItem = ({ index, style, ...props }: any) => {
	const user = props.list[index];

	return (
		<Wrapper style={style}>
			<Content>
				<h4>
					<b>{user.name}</b>
					<Badge status={user.status}>{user.status}</Badge>
				</h4>
				<p>{`${user.email} | ${user.gender.charAt(0).toUpperCase()}${user.gender.slice(1)}`}</p>
			</Content>
		</Wrapper>
	);
};

export const UserListComponent = (props: IUserListComponentProps) => {
	return props.list.length ? (
		<VirtualList
			hasNextPage={props.hasNextPage}
			isNextPageLoading={props.isNextPageLoading}
			items={props.list}
			loadNextPage={props.fetch}
			itemSize={100}
			Row={<UserItem {...props} />}
		/>
	) : (
		<EmptyListMessage>No elements to show</EmptyListMessage>
	);
};
