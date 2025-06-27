export class ResponseDto<T = any> {
  message: string;
  status: number;
  data: T | null;
  error: boolean;
}
