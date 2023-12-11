import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import fetch, {
  Blob,
  blobFrom,
  blobFromSync,
  File,
  fileFrom,
  fileFromSync,
  FormData,
  Headers,
  Request,
  Response,
} from 'node-fetch';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class OdataClientService {
  constructor(private readonly httpService: HttpService) {}

  async testConnect() {
    const url =
      'https://my350617.sapbydesign.com/sap/byd/odata/ana_businessanalytics_analytics.svc/RPZB51B94DE698C4FC50742E5QueryResults?$select=CPROD_CATG_UUID,TPROD_CATG_UUID&$format=json';
    const start = this.httpService
      .get(url, {
        headers: {
          Authorization: `Basic ${Buffer.from('AE-0000003:Smc@1234').toString(
            'base64',
          )}`,
        },
      })
      .pipe(
        catchError((error: AxiosError) => {
          console.log(
            '🚀 ~ file: odata-client.service.ts:25 ~ OdataClientService ~ catchError ~ error:',
            error,
          );
          throw error;
        }),
      );

    const response = await lastValueFrom(start);
    console.log(
      '🚀 ~ file: odata-client.service.ts:44 ~ OdataClientService ~ testConnect ~ response:',
      response.data,
    );
    return response.data;

    // const data1 = await o('https://my350617.sapbydesign.com', {
    //   batch: {
    //     headers: new Headers({
    //       Authorization: `Basic ${Buffer.from('AE-0000003:Smc@1234').toString(
    //         'base64',
    //       )}`,
    //     }),
    //   },
    // } as any)
    //   .get(
    //     'sap/byd/odata/ana_businessanalytics_analytics.svc/RPZB51B94DE698C4FC50742E5QueryResults',
    //   )
    //   .query({
    //     $select: 'CPROD_CATG_UUID,TPROD_CATG_UUID',
    //     $format: 'json',
    //   });
    // console.log(
    //   '🚀 ~ file: odata-client.service.ts:10 ~ OdataClientService ~ testConnect ~ data1:',
    //   data1,
    // );
    // return { data1 };
  }
}
