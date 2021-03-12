import {get, post } from './tools';

export const getToken = (data: any) => post({ url: "/vito-auth/oauth/token", data: data },);

export const formSubmit = () => get({ url: "/vito-sys/vitoservice/serviceuser/getByUserId"});


