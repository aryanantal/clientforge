import { Contact } from "../shcema/contact.schemas.js";

export const createContactService = async (data) => {
  return await Contact.create(data);
};
