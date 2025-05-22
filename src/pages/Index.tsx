
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommoditiesTable from '@/components/CommoditiesTable';
import { fetchCommodityPrice } from '@/services/commodityService';
import { toast } from 'sonner';

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

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [metalCommodities, setMetalCommodities] = useState<Commodity[]>([]);
  const [energyCommodities, setEnergyCommodities] = useState<Commodity[]>([]);
  const [apiKey, setApiKey] = useState('R0F7Sq/LDiUtde4fBfSzOg==eKJVDeuW0tm0BsCO');

  const metals = [
    'gold', 'silver', 'platinum', 'copper', 'palladium', 
    'uranium', 'iron', 'lithium', 'aluminium', 'zinc', 'cobalt', 'lead'
  ];
  
  const energySources = [
    'crude_oil', 'natural_gas', 'rbob_gasoline', 'heating_oil', 'brent_crude_oil'
  ];

  useEffect(() => {
    const fetchCommodities = async () => {
      try {
        setLoading(true);
        
        // Fetch metal commodities
        const metalData = await Promise.all(
          metals.map(async (name) => {
            try {
              const data = await fetchCommodityPrice(name, apiKey);
              return {
                name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
                price: data.price,
                // Simulate other values for UI demonstration
                change: parseFloat((Math.random() * 10 - 5).toFixed(2)),
                changePercent: parseFloat((Math.random() * 5 - 2.5).toFixed(2)),
                open: parseFloat((data.price * (1 - Math.random() * 0.05)).toFixed(2)),
                high: parseFloat((data.price * (1 + Math.random() * 0.05)).toFixed(2)),
                low: parseFloat((data.price * (1 - Math.random() * 0.07)).toFixed(2)),
                prev: parseFloat((data.price * (1 - Math.random() * 0.03 + 0.01)).toFixed(2))
              };
            } catch (error) {
              console.error(`Error fetching ${name}:`, error);
              return {
                name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
                price: 0
              };
            }
          })
        );
        
        setMetalCommodities(metalData);
        
        // Fetch energy commodities
        const energyData = await Promise.all(
          energySources.map(async (name) => {
            try {
              const data = await fetchCommodityPrice(name, apiKey);
              return {
                name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
                price: data.price,
                // Simulate other values for UI demonstration
                change: parseFloat((Math.random() * 10 - 5).toFixed(2)),
                changePercent: parseFloat((Math.random() * 5 - 2.5).toFixed(2)),
                open: parseFloat((data.price * (1 - Math.random() * 0.05)).toFixed(2)),
                high: parseFloat((data.price * (1 + Math.random() * 0.05)).toFixed(2)),
                low: parseFloat((data.price * (1 - Math.random() * 0.07)).toFixed(2)),
                prev: parseFloat((data.price * (1 - Math.random() * 0.03 + 0.01)).toFixed(2))
              };
            } catch (error) {
              console.error(`Error fetching ${name}:`, error);
              return {
                name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
                price: 0
              };
            }
          })
        );
        
        setEnergyCommodities(energyData);
      } catch (error) {
        console.error('Failed to fetch commodity data:', error);
        toast.error('Failed to fetch commodity data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCommodities();
  }, [apiKey]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-slate-800">Commodities Market</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">All Commodities</TabsTrigger>
            <TabsTrigger value="metals">Metals</TabsTrigger>
            <TabsTrigger value="energy">Energy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="space-y-6">
              <Card>
                <CardHeader className="bg-slate-100">
                  <CardTitle>METALS</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <CommoditiesTable commodities={metalCommodities} loading={loading} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="bg-slate-100">
                  <CardTitle>ENERGY</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <CommoditiesTable commodities={energyCommodities} loading={loading} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="metals">
            <Card>
              <CardHeader className="bg-slate-100">
                <CardTitle>METALS</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CommoditiesTable commodities={metalCommodities} loading={loading} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="energy">
            <Card>
              <CardHeader className="bg-slate-100">
                <CardTitle>ENERGY</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CommoditiesTable commodities={energyCommodities} loading={loading} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
