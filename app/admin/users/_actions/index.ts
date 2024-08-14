"use server";

import { withAdminRole } from "@/app/_shared/lib/WithSession";
import { _getUsers, _updateRole } from "./Users";

export const updateRole = withAdminRole(_updateRole);
export const getUsers = withAdminRole(_getUsers);
