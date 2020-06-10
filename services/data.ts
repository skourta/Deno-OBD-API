import { fetchData, persistData } from "./db.ts";
import { Data } from "../models/data.ts";
import createId from "../services/createId.ts";

// type UserData = Pick<User, "name" | "role" | "jiraAdmin">;
type PartialData = Pick<Data, "speed" | "distance" | "fuel">;

export const getAll = async (): Promise<Data[]> => {
  const data = await fetchData();
  return data;
};

export const getData = async (userId: string): Promise<Data | undefined> => {
  const data = await fetchData();

  return data.find(({ id }) => id === userId);
};

export const createData = async (data: PartialData): Promise<string> => {
  const oldData = await fetchData();

  const newData: Data = {
    id: createId(),
    speed: data.speed,
    distance: data.distance,
    fuel: data.fuel,
    date: new Date(),
  };

  await persistData([...oldData, newData]);

  return newData.id;
};

export const updateData = async (
  dataId: string,
  newData: PartialData,
): Promise<void> => {
  const user = await getData(dataId);

  if (!user) {
    throw new Error("Data not found");
  }

  const updatedData = {
    ...user,
    speed: newData.speed !== undefined ? newData.speed : user.speed,
    distance: newData.distance !== undefined ? newData.distance : user.distance,
    fuel: newData.fuel !== undefined ? newData.fuel : user.fuel,
  };

  const users = await fetchData();
  const filteredUsers = users.filter((user) => user.id !== dataId);

  persistData([...filteredUsers, updatedData]);
};

export const deleteData = async (dataId: string): Promise<void> => {
  const users = await getAll();
  const filteredUsers = users.filter((user) => user.id !== dataId);

  persistData(filteredUsers);
};

export const createdDummyData = async (data: PartialData): Promise<string> => {
  const oldData = await fetchData();

  let dummyData = [];
  for (let index = 0; index < 17280; index++) {
    const newData: Data = {
      id: createId(),
      speed: data.speed,
      distance: data.distance,
      fuel: data.fuel,
      date: new Date(),
    };
    dummyData.push(newData);
  }
  await persistData([...oldData, ...dummyData]);

  return "Data Added";
};
