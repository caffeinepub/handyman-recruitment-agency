import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ContactInput {
    contactType: Variant_client_candidate;
    fullName: string;
    email: string;
    message: string;
    phoneNumber: string;
}
export interface CandidateInput {
    yearsExperience: bigint;
    fullName: string;
    tradeSkill: string;
    email: string;
    physicalAddress: string;
    idNumber: string;
    phoneNumber: string;
    workAreas: string;
}
export interface EnquiryInput {
    serviceType: string;
    fullName: string;
    email: string;
    message: string;
    companyName?: string;
    phoneNumber: string;
    location: string;
}
export interface ContactMessage {
    id: bigint;
    contactType: Variant_client_candidate;
    fullName: string;
    email: string;
    message: string;
    timestamp: bigint;
    phoneNumber: string;
}
export interface Candidate {
    cv?: Document;
    id: bigint;
    qualificationCert?: Document;
    yearsExperience: bigint;
    fullName: string;
    matricCert?: Document;
    tradeSkill: string;
    email: string;
    physicalAddress: string;
    idNumber: string;
    timestamp: bigint;
    idCopy?: Document;
    phoneNumber: string;
    workAreas: string;
}
export interface Document {
    blob: ExternalBlob;
    fileName: string;
    fileType: string;
}
export interface Enquiry {
    id: bigint;
    serviceType: string;
    fullName: string;
    email: string;
    message: string;
    timestamp: bigint;
    companyName?: string;
    phoneNumber: string;
    location: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_client_candidate {
    client = "client",
    candidate = "candidate"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteCandidate(id: bigint): Promise<void>;
    deleteContactMessage(id: bigint): Promise<void>;
    deleteEnquiry(id: bigint): Promise<void>;
    getAllCandidates(): Promise<Array<Candidate>>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllEnquiries(): Promise<Array<Enquiry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCandidatesByTrade(trade: string): Promise<Array<Candidate>>;
    getPublicContactInfo(): Promise<{
        areas: Array<string>;
        whatsapp: string;
        email: string;
        facebook: string;
        phone: string;
    }>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    registerCandidate(input: CandidateInput): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactMessage(input: ContactInput): Promise<bigint>;
    submitEnquiry(input: EnquiryInput): Promise<bigint>;
    updateCandidate(id: bigint, input: CandidateInput): Promise<void>;
    uploadCandidateDocument(candidateId: bigint, fileName: string, fileType: string, blob: ExternalBlob, docType: string): Promise<void>;
}
