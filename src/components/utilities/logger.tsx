/* eslint-disable @typescript-eslint/no-explicit-any */

export function logger (...data: any[]) {
    if (process.env.NODE_ENV === 'development') {
        console.log(...data);
    }
//   console.log(...data);
}