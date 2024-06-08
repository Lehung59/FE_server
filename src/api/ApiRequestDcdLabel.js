import API from "./api";
const END_POINT = {
  GETALLBYLIMIT: "RequestDcdLabel/GetAllByLimit",
  DELETEBBYID: "RequestDcdLabel/DeleteById",
  GETITEMBYID: "RequestDcdLabel/GetItemById",
  EDITITEMBYID: "RequestDcdLabel/EditItemById",
  EDITITEM: "RequestDcdLabel/EditItem",
  CREATEITEM: "RequestDcdLabel/CreateItem",
  GETITEMBYDAY: "RequestDcdLabel/GetItemByDay",
};
class ApiRequestDcdLabel {
  GetAllByLimit = (args) => {
    return API.get(`${END_POINT.GETALLBYLIMIT}`, {
      params: {
        PageNumber: args.pageNumber || 1,
        PageSize: args.pageSize || 10,
        itemName: args.itemName ?? "",
      },
    });
  };

  DeleteById = (id) => {
    return API.delete(`${END_POINT.DELETEBBYID}/${id}`);
  };

  GetItemById = (id) => {
    return API.get(`${END_POINT.GETITEMBYID}/${id}`);
  };
  EditItemById = (formState) => {
    return API.put(`${END_POINT.EDITITEMBYID}`, formState, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
    });
  };
  
  //
  CreateItem = (formState) => {
    return API.post(`${END_POINT.CREATEITEM}`, formState, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
    });
  };
}
export default new ApiRequestDcdLabel();
