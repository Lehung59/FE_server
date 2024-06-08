import API from "./api";
const END_POINT = {
  GETALLBYLIMIT: "Log/GetAllByLimit",
  GETLOGDETAIL: "Log/GetLogDetail",
};
class ApiLog {
  GetAllByLimit = (args) => {
    return API.get(`${END_POINT.GETALLBYLIMIT}`, {
      params: {
        PageNumber: args.pageNumber || 1,
        PageSize: args.pageSize || 10,
        logType: args.logType ?? "",
        author: args.author ?? "",
        createdDate: args.createdDate ?? "",
      },
    });
  };

  GetLogDetail = (id) => {
    return API.get(`${END_POINT.GETLOGDETAIL}/${id}`);
  };
}
export default new ApiLog();
