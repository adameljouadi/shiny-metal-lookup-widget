
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import CommodityRow from './CommodityRow';

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

interface CommoditiesTableProps {
  commodities: Commodity[];
  loading: boolean;
}

const CommoditiesTable = ({ commodities, loading }: CommoditiesTableProps) => {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-white hover:bg-white">
            <TableHead className="w-[200px] text-left">Name</TableHead>
            <TableHead className="text-right">Value</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead className="text-right">Chg%</TableHead>
            <TableHead className="text-right">Open</TableHead>
            <TableHead className="text-right">High</TableHead>
            <TableHead className="text-right">Low</TableHead>
            <TableHead className="text-right">Prev</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array(5).fill(0).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[50px] ml-auto" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[50px] ml-auto" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[50px] ml-auto" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[50px] ml-auto" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[50px] ml-auto" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[50px] ml-auto" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[50px] ml-auto" /></TableCell>
              </TableRow>
            ))
          ) : (
            commodities.map((commodity, index) => (
              <CommodityRow 
                key={index}
                commodity={commodity}
              />
            ))
          )}
          
          {!loading && commodities.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No commodities available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommoditiesTable;
