
type CommodityPriceResponse = {
  price: number;
  name?: string;
};

export const fetchCommodityPrice = async (name: string, apiKey: string): Promise<CommodityPriceResponse> => {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/commodityprice?name=${name}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`API request failed for ${name}:`, errorData);
      throw new Error(`API request failed with status ${response.status}: ${errorData.error || 'Unknown error'}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching commodity price:', error);
    throw error;
  }
};
