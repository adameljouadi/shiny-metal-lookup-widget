
import { TableCell, TableRow } from '@/components/ui/table';
import { ArrowUp, ArrowDown } from 'lucide-react';

type Commodity = {
  name: string;
  price: number;
  change?: number;
  changePercent?: number;
  open?: number;
  high?: number;
  low?: number;
  prev?: number;
};

interface CommodityRowProps {
  commodity: Commodity;
}

const CommodityRow = ({ commodity }: CommodityRowProps) => {
  const isPositiveChange = commodity.change && commodity.change > 0;
  const isNegativeChange = commodity.change && commodity.change < 0;
  
  const formatNumber = (num: number | undefined) => {
    if (num === undefined) return '-';
    return num.toFixed(2);
  };

  return (
    <TableRow className="hover:bg-slate-50">
      <TableCell className="font-medium">{commodity.name}</TableCell>
      <TableCell className="text-right">{formatNumber(commodity.price)}</TableCell>
      <TableCell className={`text-right flex items-center justify-end ${isPositiveChange ? 'text-green-600' : isNegativeChange ? 'text-red-600' : ''}`}>
        {isPositiveChange && <ArrowUp className="h-4 w-4 mr-1" />}
        {isNegativeChange && <ArrowDown className="h-4 w-4 mr-1" />}
        {formatNumber(commodity.change)}
      </TableCell>
      <TableCell className={`text-right ${isPositiveChange ? 'text-green-600' : isNegativeChange ? 'text-red-600' : ''}`}>
        {commodity.changePercent ? `${commodity.changePercent > 0 ? '+' : ''}${formatNumber(commodity.changePercent)}%` : '-'}
      </TableCell>
      <TableCell className="text-right">{formatNumber(commodity.open)}</TableCell>
      <TableCell className="text-right">{formatNumber(commodity.high)}</TableCell>
      <TableCell className="text-right">{formatNumber(commodity.low)}</TableCell>
      <TableCell className="text-right">{formatNumber(commodity.prev)}</TableCell>
    </TableRow>
  );
};

export default CommodityRow;
