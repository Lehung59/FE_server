import API from "./api";
const END_POINT = {
  GETALLBYLIMIT: "User/GetAllByLimit",
  DELETEBBYID: "User/DeleteById",
  BANNEDBYID: "User/BannedById",
  GETITEMBYID: "User/GetItemById",
  EDITITEMBYID: "User/EditItemById",
  CREATEITEM: "User/CreateItem",
};
class ApiUser {
  GetAllByLimit = (args) => {
    return API.get(`${END_POINT.GETALLBYLIMIT}`, {
      params: {
        PageNumber: args.pageNumber || 1,
        PageSize: args.pageSize || 10,
        UserName: args.userName ?? "",
      },
    });
  };

  DeleteById = (id) => {
    return API.delete(`${END_POINT.DELETEBBYID}/${id}`);
  };

  BannedById = (id) => {
    return API.put(`${END_POINT.BANNEDBYID}/${id}`);
  };

  GetItemById = (id) => {
    return API.get(`${END_POINT.GETITEMBYID}/${id}`);
  };
  EditItemById = (formState) => {
    return API.post(`${END_POINT.EDITITEMBYID}`, formState, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data;",
        "cache-control": "no-cache",
      },
    });
  };
  CreateItem = (formState) => {
    return API.post(`${END_POINT.CREATEITEM}`, formState, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data;",
        "cache-control": "no-cache",
      },
    });
  };
}
export default new ApiUser();
