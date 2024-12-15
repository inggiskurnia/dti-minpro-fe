export type Voucher = {
  voucherId: number;
  code: string;
  name: string;
  amount: number;
  description: string;
  totalCapacity: number;
  totalAvailable: number;
  validityPeriod: string;
  eventId: number;
  eventName: string;
  voucherTypeId: number;
  voucherTypeName: string;
};

export type VoucherResponse = {
  statusCode: number;
  message: string;
  success: boolean;
  data: Voucher[];
};

export interface UserVoucher {
  userVoucherId: number;
  voucherId: number;
  voucherCode: string;
  voucherName: string;
  voucherAmount: number;
  voucherDescription: string;
  voucherType: string;
  expiredAt: Date;
}

export interface GetUserVouchersResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: UserVoucher[];
}

export interface VoucherClaimResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: {
    userVoucherId: number;
    voucherId: number;
    voucherCode: string;
    voucherName: string;
    voucherAmount: number;
    voucherType: string;
    expiredAt: string;
    usedAt: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }[];
}
