import { UserI } from "../../slices/branded/user/user.types";

export interface StaffPayloadI {
  address?: string;
  benefits?: string;
  dateOfBirth?: string; // ISO Date
  firstName?: string;
  lastName?: string;
  position?: string;
  isAuthenticated?: boolean;
  isActive?: boolean;
  salary?: number;
  hireDate?: string; // ISO Date
  department?: string;
  email?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  lastActiveTime?: string; // ISO Date
  password?: string;
  notes?: string;
  branchId?: string;
  phoneNumber?: string;
  role?: string;
}
export interface StaffResponseI {
  userId: UserI;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  branchId: string;
  department: string;
  isActive: boolean;
  dateOfBirth: Date;
  phoneNumber: string;
  address: string;
  hireDate: Date;
  lastActiveTime: Date;
  isAuthenticated: boolean;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  salary?: number;
  benefits?: string;
  notes?: string;
  id: string;
}
