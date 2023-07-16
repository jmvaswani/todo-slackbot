//Just a basic template of a form of response that can be used locally

export interface LocalResponse<T> {
  ok: boolean;
  data: T;
  message?: string;
  error?: string;
}
