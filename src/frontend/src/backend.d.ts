import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Reservation {
    id: bigint;
    customerName: string;
    date: Time;
    specialRequests: string;
    numGuests: bigint;
    phoneNumber: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllReservations(): Promise<Array<Reservation>>;
    submitReservation(customerName: string, phoneNumber: string, date: Time, numGuests: bigint, specialRequests: string): Promise<bigint>;
}
