/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "../../app/config";
import { getLocalAuthData } from "./utils";



export  class SocketClient {
  private static instance: SocketClient;
constructor () {
         const { token } = getLocalAuthData();
  this.socket = io(`wss${BASE_URL.split("https")[1]}` || "", {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
 withCredentials: true,
  });
  this.socket.on("connect", () => {
    toast.success("Connected to server")
  })
  this.socket.on("connect_error", (error) => {
    console.log("inside error")

    toast.error(`${JSON.stringify(error)}`)
  })
  this.socket.on("disconnect", (reason) => {
    console.log("inside disconnect")
    toast.error(`${JSON.stringify(reason)}`)
  })
  }

  static getInstance(): SocketClient {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }

    return SocketClient.instance;
  }

  private socket: Socket | null = null;

  // connect(): Promise<void> {

  //   return new Promise((resolve, reject) => {
  

  //     this.socket.on("connect", () => {
  //       console.log("connected to socket")
  //       resolve()});
  //     this.socket.on("connect_error", (error) => {
  //       console.log(error)
  //       reject(error)
  //     });
  //   });
  // }

  disconnect(): Promise<void> {
    return new Promise((resolve) => {
        if (this.socket) {
            this.socket = null;
          resolve();
      } else {
        resolve();
      }
    });
  }

  emit(event: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject(new Error("No socket connection."));

      this.socket.emit(event, data, (response: any) => {
        if (response.error) {
          console.error(response.error);
          reject(response.error);
        } else {
          resolve();
        }
      });
    });
  }

  on(event: string, fun: (...args: any[]) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject(new Error("No socket connection."));

      this.socket.on(event, fun);
      resolve();
    });
  }
}


