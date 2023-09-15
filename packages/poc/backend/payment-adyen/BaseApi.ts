import axios, { AxiosInstance } from 'axios';
import { AdyenMapper } from './mappers/AdyenMapper';
import { CreateSessionPayload, SessionResponse, PaymentDetails, PaymentDetailsResponse } from './Session';
import { AdyenConfig } from '@Payment-adyen/interfaces/AdyenConfig';

class BaseApi {
  private instance: AxiosInstance;

  constructor(config: AdyenConfig) {
    //Axios instance
    this.instance = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'x-API-key': config.apiKey,
        'content-type': 'application/json',
      },
    });

    //Request interceptor
    this.instance.interceptors.request.use((req) => {
      req.data = { ...(req.data || {}), merchantAccount: config.merchantAccount };
      return req;
    });
  }

  async createSession(payload: CreateSessionPayload) {
    const response = await this.instance.post<SessionResponse>('/sessions', payload);
    return AdyenMapper.adyenSessionResponseToSessionResponse(response.data);
  }

  async paymentDetails(payload: PaymentDetails) {
    const response = await this.instance.post<PaymentDetailsResponse>('/payments/details', payload);
    return AdyenMapper.adyenPaymentDetailsToDetails(response.data);
  }
}

export default BaseApi;
