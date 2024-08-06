import type { FetchOptions } from "ofetch";
import { handleLaravelRequest } from "../utils/laravel-request";
import {
  useAsyncData,
  type NuxtError,
  type AsyncDataRequestStatus,
} from "nuxt/app";
import type { DedupeOption } from "#app/defaults";

interface AsyncDataExecuteOptions {
  _initial?: boolean;
  dedupe?: DedupeOption;
}

interface LaravelAsynReturn<T> {
  laravelMessage: string | undefined;
  laravelErrors: never[] | Record<string, string[]> | undefined;
  data: T | undefined;
  error: globalThis.Ref<NuxtError<unknown> | undefined>;
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>;
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>;
  clear: () => void;
  pending: globalThis.Ref<boolean>;
  status: globalThis.Ref<AsyncDataRequestStatus>;
}

export const useLaravelRequest = async <T>(
  requestUrl: string,
  options: FetchOptions<"json"> = {}
) => {
  return handleLaravelRequest<T>(requestUrl, options);
};

export const useAsyncLaravelRequest = async <T>(
  requestUrl: string,
  key: string = "",
  options: FetchOptions<"json"> = {}
): Promise<LaravelAsynReturn<T>> => {
  return await useAsyncData(key, () => {
    return handleLaravelRequest<T>(requestUrl, options);
  }).then((res) => {
    return {
      ...res,
      laravelMessage: res.data.value?.message,
      laravelErrors: res.data.value?.errors,
      data: res.data.value?.data,
    };
  });
};
