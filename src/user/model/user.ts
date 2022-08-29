type UserGender = "male" | "female";
type UserStatus = "inactive" | "active";

export interface IUserBase {
	id: number;
	name: string;
	email: string;
	gender: UserGender;
	status: UserStatus;
}
