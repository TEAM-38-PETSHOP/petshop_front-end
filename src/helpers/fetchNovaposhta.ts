import { ResponseCities } from '@/types/novaposhta/ResponseCities';
import { Warehouse } from '@/types/novaposhta/ResponseWarehouses';
import { novaposhtaRequest } from '@/utils/NovaposhtaClient';

export const getCities = (searchCity: string) => {
  return novaposhtaRequest<ResponseCities>(
    'Address',
    'searchSettlements',
    {
      CityName: searchCity,
      Limit: 7,
      Page: 1,
    },
    true
  );
};

export const getWarehouses = (city: string, searchWarehouses: string) => {
  return novaposhtaRequest<Warehouse[]>('AddressGeneral', 'getWarehouses', {
    FindByString: searchWarehouses,
    CityRef: city,
    Limit: 50,
    Page: 1,
  });
};
