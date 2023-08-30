import {array, boolean, number, object, output, string} from 'zod';
import {permissionParser} from '@/common/parsers/permissionParser';

export const citizenParser = object({
    // created_at: string(),
    email: string().nullable(),
    description: string().nullable(),
    id_number: string(),
    first: string(),
    id: number(),
    last: string(),
    status: boolean(),
    image: string().nullable(),
    phone: string(),
    permissions: array(permissionParser).nullable(),
    role: string().nullable(),
    invoiceable: boolean(),
    // updated_at: string(),
});

export type Citizen = output<typeof citizenParser>;
export const registerCitizenParser = object({
    // created_at: string(),
    first: string(),
    last: string(),
    email: string().nullable(),
    phone: string().nullable(),
    id_number: string(),
    id: number(),
    status: boolean(),
    invoiceable: boolean().nullable(),
    // updated_at: string(),
});

export type RegisterCitizen = output<typeof registerCitizenParser>;

export interface nonPaginateResponse {
    code: number,
    data: Citizen[],
    message: string
}
