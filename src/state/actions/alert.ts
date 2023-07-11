import { Alert, StatusCode } from '../index.types';

export const updateAlert = (alert: Alert) => ({ alert });

export const clearAlert = () => ({ alert: undefined });

export const setResponseStatus = (responseStatus: StatusCode) => ({ responseStatus });

