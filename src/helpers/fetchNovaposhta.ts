import { ResponseCities } from '@/types/novaposhta/ResponseCities';
import { novaposhtaRequest } from '@/utils/NovaposhtaClient';

export const getCities = (searchCity: string) => {
  return novaposhtaRequest<ResponseCities>('Address', 'searchSettlements', {
    CityName: searchCity,
    Limit: 7,
    Page: 1,
  });
};
