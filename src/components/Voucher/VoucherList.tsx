import { FC } from "react";
import { Voucher } from "@/types/voucher";
import VoucherItem from "./VoucherItem";

interface VoucherListProps {
  vouchers: Voucher[];
}

const VoucherList: FC<VoucherListProps> = ({ vouchers }) => {
  return (
    <div>
      {vouchers.map((voucher) => (
        <VoucherItem key={voucher.voucherId} voucher={voucher}></VoucherItem>
      ))}
    </div>
  );
};

export default VoucherList;
