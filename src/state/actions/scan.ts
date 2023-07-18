import railsAxios from "@util/railsAxios";

export const scan = async (jwt: string, qrCode: string) => {
  try {
    const { request: { status, message } } = await railsAxios(jwt).post("/donors/scan", { qr_code: qrCode });

    return {
      responseStatus: {
        code: status,
        message: message,
      },
    };
  } catch (error: any) {
    return {
      responseStatus: {
        code: error.response.status,
        message: error.response.message,
      },
    };
  }
};
