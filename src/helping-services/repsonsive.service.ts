import { ResponseDto } from "./response.dto";

const successCodes = [200, 201];

export function ResponseService<T>(
  message: string,
  status: number,
  data: T | null = null
): ResponseDto<T> {
  return {
    message,
    status,
    data,
    error: !successCodes.includes(status),
  };
}
