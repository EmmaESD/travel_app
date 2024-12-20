import { TravelDTO } from "../types/travel.type";

const API_URL = import.meta.env.VITE_API_URL;

// TRAVELS //

export const findAll = async () => {
  const response = await fetch(`${API_URL}/travels`);
  const data = await response.json();
  return data;
};

export const findOneById = async (id: string) => {
  const response = await fetch(`${API_URL}/travels/${id}`);
  const data = await response.json();
  return data;
};

export const create = async (travel: TravelDTO) => {
  const response = await fetch(`${API_URL}/travels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(travel),
  });
  const data = await response.json();
  return data;
};

export const remove = async (id: string) => {
  return await fetch(`${API_URL}/travels/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const update = async (id: string, travel: TravelDTO) => {
  const response = await fetch(`${API_URL}/travels/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(travel),
  });
  const data = await response.json();
  return data;
};

//Categories
export const findAllCat = async () => {
  const response = await fetch(`${API_URL}/categories`);
  const data = await response.json();
  return data;
};

export const findOneCatById = async (id: string) => {
  const response = await fetch(`${API_URL}/categories/${id}`);
  const data = await response.json();
  return data;
};

export const createCat = async (travel: TravelDTO) => {
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(travel),
  });
  const data = await response.json();
  return data;
};

export const removeCat = async (id: string) => {
  return await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateCat = async (id: string, travel: TravelDTO) => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(travel),
  });
  const data = await response.json();
  return data;
};
