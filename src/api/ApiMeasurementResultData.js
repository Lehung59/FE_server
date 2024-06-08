import API from "./api";
const END_POINT = {
  GETALLBYLIMIT: "MeasurementResultData/GetAllByLimit",
  DELETEBBYID: "MeasurementResultData/DeleteById",
  GETITEMBYID: "MeasurementResultData/GetItemById",
  EDITITEMBYID: "MeasurementResultData/EditItemById",
  EDITITEM: "MeasurementResultData/EditItem",
  CREATEITEM: "MeasurementResultData/CreateItem",
  GETITEMBYDAY: "MeasurementResultData/GetItemByDay",
};
class ApiMeasurementResultData {
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
  GetItemByDay = (id, recordingDate) => {
    return API.get(`${END_POINT.GETITEMBYDAY}/${id}/${recordingDate}`);
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
  //
  EditItem = (formState) => {
    return API.post(`${END_POINT.EDITITEM}`, formState, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
    });
  };
}
export default new ApiMeasurementResultData();
